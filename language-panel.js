/* ============================================================
   LANGUAGE-PANEL.JS — Selector de idioma para HERENCIA IA
   Panel lateral · Banderas · Cambio dinámico de idioma
//    ============================================================ */

const LanguagePanel = {

    current: "es",

    available: {
        es: { name: "Español", flag: "🇪🇸" },
        en: { name: "English", flag: "🇬🇧" },
        ca: { name: "Català", flag: "🇨🇦" },
        fr: { name: "Français", flag: "🇫🇷" },
        de: { name: "Deutsch", flag: "🇩🇪" },
        it: { name: "Italiano", flag: "🇮🇹" },
        pt: { name: "Português", flag: "🇵🇹" },
        ru: { name: "Русский", flag: "🇷🇺" },
        ar: { name: "العربية", flag: "🇸🇦" },
        zh: { name: "中文", flag: "🇨🇳" },
        ja: { name: "日本語", flag: "🇯🇵" },
        ko: { name: "한국어", flag: "🇰🇷" },
        hi: { name: "हिन्दी", flag: "🇮🇳" }
    },

    open(){
        UISystem.show("#language_panel");
    },

    close(){
        UISystem.hide("#language_panel");
    },

    set(lang){
        if(!this.available[lang]) return;

        this.current = lang;
        MemoryCore?.pushMid?.("LANG_SET:" + lang);

        // cargar el módulo correspondiente
        const mod = {
            es: LangES,
            en: LangEN,
            ca: LangCA,
            fr: LangFR,
            de: LangDE,
            it: LangIT,
            pt: LangPT,
            ru: LangRU,
            ar: LangAR,
            zh: LangZH,
            ja: LangJA,
            ko: LangKO,
            hi: LangHI
        }[lang];

        if(mod){
            window.CurrentLang = mod;
            DiagnosticsLogger?.log("LANG", "Idioma cambiado a " + mod.code);
        }
    },

    init(){
        const container = document.querySelector("#language_panel_items");
        if(!container) return;

        container.innerHTML = "";

        for(const code in this.available){
            const {name, flag} = this.available[code];
            const btn = document.createElement("div");
            btn.className = "lang_option";
            btn.innerText = `${flag} ${name}`;
            btn.onclick = () => this.set(code);
            container.appendChild(btn);
        }

        console.log("🌐 Panel de idiomas inicializado.");
    },

    expose(){
        window.LanguagePanel = this;
    }
};

LanguagePanel.expose();