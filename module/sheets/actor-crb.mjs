import ActorSheetT20CharacterTabbed from "./actor-tabbed.mjs";

/**
 * Ficha de personagem "estilo livro" (CRB): barra lateral com recursos/atributos,
 * cabeçalho com nível/XP e navegação por abas com ícones — organização inspirada
 * na ficha do sistema Pathfinder 2e, reaproveitando todos os partials e listeners
 * da ficha padrão do T20.
 * @extends {ActorSheetT20CharacterTabbed}
 */
export default class ActorSheetT20CharacterCRB extends ActorSheetT20CharacterTabbed {
	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["tormenta20", "sheet", "actor", "character", "crb"],
			width: 920,
			height: 780,
			tabs: [
				{
					navSelector: ".sheet-tabs",
					contentSelector: ".sheet-body",
					initial: "character"
				}
			],
			scrollY: [
				".sidebar",
				".tab.character .column",
				".tab.combat",
				".tab.inventory",
				".tab.powers",
				".tab.spells",
				".tab.effects",
				".tab.journal",
				".tab.modifiers"
			]
		});
	}

	/** @override */
	get layout() {
		return "character-crb";
	}

	/** @override */
	async getData() {
		const sheetData = await super.getData();
		// Perícias em destaque na barra lateral (resistências + iniciativa + percepção)
		const byKey = Object.fromEntries((sheetData.skills ?? []).map((s) => [s.key, s]));
		sheetData.crb = {
			saves: ["fort", "refl", "vont"].map((key) => byKey[key]).filter(Boolean),
			quick: ["inic", "perc"].map((key) => byKey[key]).filter(Boolean),
			showSpells: sheetData.actor.maiorCirculo > 0 || sheetData.editMode,
			classesLabel: (sheetData.actor.classes ?? []).map((c) => `${c.name} ${c.system.niveis}`).join(" / ")
		};
		return sheetData;
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);
		// Clique no nome da raça/classe do cabeçalho abre a ficha do item (o menu de contexto continua disponível)
		html.find(".char-summary .item[data-item-id] > .item-control").click((ev) => {
			ev.preventDefault();
			const id = ev.currentTarget.closest(".item")?.dataset.itemId;
			this.actor.items.get(id)?.sheet.render(true);
		});
		// Botões +/− de nível no cabeçalho: sobem/descem o nível de uma classe
		html.find(".level-control").click(this._onLevelControl.bind(this));
	}

	/**
	 * Aumenta ou diminui o nível de classe do personagem. O nível do personagem é a soma dos
	 * níveis dos itens de classe; com mais de uma classe, pergunta qual alterar.
	 * @param {MouseEvent} event
	 */
	async _onLevelControl(event) {
		event.preventDefault();
		const delta = event.currentTarget.dataset.action === "level-up" ? 1 : -1;
		const classes = this.actor.itemTypes.classe;
		if (!classes.length) {
			ui.notifications.warn(game.i18n.localize("T20.CRB.NoClass"));
			return game.packs.get("tormenta20.classes")?.render(true);
		}
		const maxLevel = game.settings.get("tormenta20", "gameSystem") === "Skyfall" ? 10 : 20;
		const apply = async (cls) => {
			const niveis = Math.clamp((cls.system.niveis ?? 1) + delta, 1, maxLevel);
			if (niveis === cls.system.niveis) return;
			await cls.update({ "system.niveis": niveis });
		};
		if (classes.length === 1) return apply(classes[0]);
		const buttons = Object.fromEntries(
			classes.map((c) => [c.id, { label: `${c.name} ${c.system.niveis}`, callback: () => apply(c) }])
		);
		return new Dialog({
			title: game.i18n.localize(delta > 0 ? "T20.LevelUp" : "T20.LevelDown"),
			content: `<p>${game.i18n.localize("T20.CRB.ChooseClass")}</p>`,
			buttons
		}).render(true);
	}
}
