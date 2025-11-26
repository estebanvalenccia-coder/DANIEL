export const DevMenuSecurityPanel = {

    open(){
        if(!SecurityCenterPRO) return;

        const logs = SecurityCenterPRO.getLogs();

        alert(`
🛡️ SECURITY CENTER PRO
──────────────────────────────
Intentos fallidos: ${SecurityCenterPRO.attempts}
Lockdown: ${SecurityCenterPRO.state.lockdown}
Cuarentena: ${SecurityCenterPRO.state.quarantine}
Integridad: ${SecurityCenterPRO.state.integrity_ok ? "OK" : "FALLA"}

LOGS:
${logs}
        `);
    }
};

window.DevMenuSecurityPanel = DevMenuSecurityPanel;