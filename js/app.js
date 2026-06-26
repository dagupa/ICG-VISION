    // Variable para guardado de progreso
        let hasUnsavedChanges = false;
    // Handle de fichero reemplazado por _saveDirHandle gestionado por IndexedDB (ver bloque Administrador)
    // Autoguardado: cada 10 cambios O cada 10 minutos (solo si hay cambios pendientes)
    let _autoSaveCount = 0;
    const AUTO_SAVE_THRESHOLD = 10;
    const AUTO_SAVE_INTERVAL_MS = 10 * 60 * 1000; // 10 minutos
    let _autoSaveTimer = null;

    function _startAutoSaveTimer() {
        if (_autoSaveTimer) clearInterval(_autoSaveTimer);
        _autoSaveTimer = setInterval(() => {
            if (hasUnsavedChanges) autoSaveToFolderOrBackup();
        }, AUTO_SAVE_INTERVAL_MS);
    }

    function registerChange() {
        hasUnsavedChanges = true;
        updateSaveButton();
        _autoSaveCount++;
        if (_autoSaveCount >= AUTO_SAVE_THRESHOLD) {
            _autoSaveCount = 0;
            autoSaveToFolderOrBackup();
        }
    }

    function _buildSaveData() {
        return {
            equipo: reportMetadata?.equipo || 'default',
            fechaExportacion: new Date().toISOString(),
            progress: progressMap,
            errors: errorsMap,
            rows: rawData
        };
    }

    function _getInternalSnapshotKey() {
        const equipo = reportMetadata?.equipo || 'default';
        return `ICGVision_AutoSnapshot_${equipo.replace(/\s+/g, '_')}`;
    }

    // Copia de seguridad silenciosa dentro del navegador (red de seguridad ante cierres
    // inesperados). No marca los datos como guardados ni desactiva el botón.
    function _writeLocalBackup() {
        try {
            if (!reportMetadata || !reportMetadata.equipo) return;
            saveProgress();
            saveErrors();
            localStorage.setItem(_getInternalSnapshotKey(), JSON.stringify(_buildSaveData()));
        } catch (e) {
            console.error('Copia de seguridad interna fallida:', e);
        }
    }

    // Autoguardado automático y transparente: si hay carpeta configurada con permiso,
    // escribe el JSON completo en ella sin molestar al usuario. Si no la hay, conserva
    // solo la copia interna y deja el botón "Guardar cambios" activo.
    async function autoSaveToFolderOrBackup() {
        _writeLocalBackup();
        if (!reportMetadata || !reportMetadata.equipo) return;
        if (!_saveDirHandle) return; // sin carpeta: el botón permanece activo
        try {
            // Autoguardado silencioso: solo si el permiso ya está concedido (sin diálogo).
            const perm = await _saveDirHandle.queryPermission({ mode: 'readwrite' });
            if (perm !== 'granted') return; // se guardará al pulsar "Guardar"
            await _writeJsonToDir(_saveDirHandle, _buildSaveData());
            hasUnsavedChanges = false;
            updateSaveButton();
        } catch (e) {
            // No se pudo autoguardar en carpeta: conservamos la copia interna y el botón
            // activo. NO borramos la carpeta configurada.
            console.error('Autoguardado en carpeta fallido:', e);
        }
    }
    // Variables para el easter eg
    let helpClickCount = 0;
   let helpClickTimer;
    // Función auxiliar para gestionar fallos de imagen y evitar conflictos de sintaxis en el HTML inyectado
       function handlePinError(imgElement) {
           const container = imgElement.parentElement;
           if (container) {
               container.innerHTML = '<i data-lucide="pin" class="w-3.5 h-3.5 text-sap-blue"></i>';
               if (window.lucide) lucide.createIcons();
           }
       }
       // --- MASTER DATA CRIMPAR ---
       window.crimpingMasterData = [
           {id: "640201", seccion: "0,5", img_pin: "640201", txt_pin: "M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640201", seccion: "1", img_pin: "640201", txt_pin: "M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640201", seccion: "1,5", img_pin: "640201", txt_pin: "M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640202", seccion: "2,5", img_pin: "640202", txt_pin: "M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640203", seccion: "4", img_pin: "640203", txt_pin: "M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640203", seccion: "6", img_pin: "640203", txt_pin: "M3", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640204", seccion: "0,5", img_pin: "640204", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640204", seccion: "1", img_pin: "640204", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640204", seccion: "1,5", img_pin: "640204", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640205", seccion: "2,5", img_pin: "640205", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640206", seccion: "4", img_pin: "640206", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640206", seccion: "6", img_pin: "640206", txt_pin: "M4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640207", seccion: "0,5", img_pin: "640207", txt_pin: "M5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640207", seccion: "1", img_pin: "640207", txt_pin: "M5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640207", seccion: "1,5", img_pin: "640207", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640208", seccion: "2,5", img_pin: "640208", txt_pin: "TERMINAL AZUL M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640209", seccion: "4", img_pin: "640209", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640209", seccion: "6", img_pin: "640209", txt_pin: "M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640210", seccion: "0,5", img_pin: "640210", txt_pin: "M6", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640210", seccion: "1", img_pin: "640210", txt_pin: "M6", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640210", seccion: "1,5", img_pin: "640210", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640211", seccion: "2,5", img_pin: "640211", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640212", seccion: "4", img_pin: "640212", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640212", seccion: "6", img_pin: "640212", txt_pin: "M6", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640213", seccion: "0,5", img_pin: "640213", txt_pin: "M8", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640213", seccion: "1", img_pin: "640213", txt_pin: "M8", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640213", seccion: "1,5", img_pin: "640213", txt_pin: "M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640215", seccion: "4", img_pin: "640215", txt_pin: "M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640215", seccion: "6", img_pin: "640215", txt_pin: "M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640218", seccion: "0,5", img_pin: "", txt_pin: "M10", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640218", seccion: "1", img_pin: "", txt_pin: "M10", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640218", seccion: "1,5", img_pin: "", txt_pin: "M10", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640220", seccion: "4", img_pin: "640220", txt_pin: "M10", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640220", seccion: "6", img_pin: "640220", txt_pin: "M10", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640230", seccion: "0,5", img_pin: "640230", txt_pin: "HORQ M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640230", seccion: "1", img_pin: "640230", txt_pin: "HORQ M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640230", seccion: "1,5", img_pin: "640230", txt_pin: "HORQ M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640232", seccion: "0,5", img_pin: "640232", txt_pin: "HORQ M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640232", seccion: "1", img_pin: "640232", txt_pin: "HORQ M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640232", seccion: "1,5", img_pin: "640232", txt_pin: "HORQ M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640233", seccion: "2,5", img_pin: "640233", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640234", seccion: "4", img_pin: "640234", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640234", seccion: "6", img_pin: "640234", txt_pin: "M4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640235", seccion: "0,5", img_pin: "640235", txt_pin: "HORQ M5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640235", seccion: "1", img_pin: "640235", txt_pin: "HORQ M5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640235", seccion: "1,5", img_pin: "640235", txt_pin: "HORQ M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640237", seccion: "4", img_pin: "640237", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640237", seccion: "6", img_pin: "640237", txt_pin: "M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640240", seccion: "4", img_pin: "640240", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640240", seccion: "6", img_pin: "640240", txt_pin: "M6", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640243", seccion: "0,5", img_pin: "640243", txt_pin: "PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640243", seccion: "1", img_pin: "640243", txt_pin: "PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640243", seccion: "1,5", img_pin: "640243", txt_pin: "PUNTA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640245", seccion: "4", img_pin: "640245", txt_pin: "PUNTA", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640245", seccion: "6", img_pin: "640245", txt_pin: "PUNTA", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640259", seccion: "0,5", img_pin: "640259", txt_pin: "FASTON tamaño de cable 0.26 a 0.96 mm²", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640259", seccion: "1", img_pin: "640259", txt_pin: "FASTON tamaño de cable 0.26 a 0.96 mm²", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640259", seccion: "1,5", img_pin: "640259", txt_pin: "FASTON tamaño de cable 0.26 a 0.96 mm²", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640260", seccion: "0,5", img_pin: "640260", txt_pin: "FASTON R tamaño cable 0.26 a 0.96 mm²", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640260", seccion: "1", img_pin: "640260", txt_pin: "FASTON R tamaño cable 0.26 a 0.96 mm²", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640260", seccion: "1,5", img_pin: "640260", txt_pin: "FASTON R tamaño cable 0.26 a 0.96 mm²", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640261", seccion: "2,5", img_pin: "640261", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640262", seccion: "4", img_pin: "640262", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640262", seccion: "6", img_pin: "640262", txt_pin: "FASTON", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640263", seccion: "2,5", img_pin: "640263", txt_pin: "FASTON M", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640273", seccion: "0,5", img_pin: "640273", txt_pin: "R FASTON M", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640273", seccion: "1", img_pin: "640273", txt_pin: "R FASTON M", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640273", seccion: "1,5", img_pin: "640273", txt_pin: "R FASTON M", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640288", seccion: "0,5", img_pin: "640288", txt_pin: "PUNTA-PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640288", seccion: "1", img_pin: "640288", txt_pin: "PUNTA-PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640288", seccion: "1,5", img_pin: "640288", txt_pin: "PUNTA-PUNTA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640289", seccion: "4", img_pin: "640289", txt_pin: "PUNT-PUNT", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640289", seccion: "6", img_pin: "640289", txt_pin: "PUNT-PUNT", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640290", seccion: "2,5", img_pin: "640290", txt_pin: "PUNT-PUNT", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640298", seccion: "1,5", img_pin: "640298", txt_pin: "PRESION M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "4,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640298", seccion: "2,5", img_pin: "640298", txt_pin: "PRESION M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "4,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640299", seccion: "4", img_pin: "640299", txt_pin: "PRESION M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640299", seccion: "6", img_pin: "640299", txt_pin: "PRESION M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640301", seccion: "4", img_pin: "640301", txt_pin: "PRESION M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640301", seccion: "6", img_pin: "640301", txt_pin: "PRESION M4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640304", seccion: "4", img_pin: "640304", txt_pin: "PRESION M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640304", seccion: "6", img_pin: "640304", txt_pin: "PRESION M6", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640305", seccion: "10", img_pin: "640305", txt_pin: "M6 (XCT 10 - 6) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 50-10 CU", img_pos: "4 E 50-10 CU", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640306", seccion: "10", img_pin: "640306", txt_pin: "M8 (XCT 10 - 8) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 50-10 CU", img_pos: "4 E 50-10 CU", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640307", seccion: "10", img_pin: "640307", txt_pin: "M10 (XCT 10 - 10) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 50-10 CU", img_pos: "4 E 50-10 CU", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640308", seccion: "16", img_pin: "640308", txt_pin: "M5 (XCT 16-5) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 70-16 CU", img_pos: "4 E 70-16 CU", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640309", seccion: "16", img_pin: "640309", txt_pin: "M6 (XCT 16-6) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 70-16 CU", img_pos: "4 E 70-16 CU", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640310", seccion: "16", img_pin: "640310", txt_pin: "M8 (XCT 16-8) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 70-16 CU", img_pos: "4 E 70-16 CU", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640311", seccion: "16", img_pin: "640311", txt_pin: "M10 (XCT 16-10) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 70-16 CU", img_pos: "4 E 70-16 CU", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640314", seccion: "25", img_pin: "640314", txt_pin: "M6 (XCT 25-6) AMP-TYCO", txt_pela: "9001540000", txt_longitud: "15", img_pela: "9001540000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 95-25 CU", img_pos: "", txt_matriz: "25", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640315", seccion: "25", img_pin: "640315", txt_pin: "M8 (XCT 25-8) AMP-TYCO", txt_pela: "9001540000", txt_longitud: "15", img_pela: "9001540000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 95-25 CU", img_pos: "", txt_matriz: "25", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640316", seccion: "25", img_pin: "640316", txt_pin: "M10 (XCT 25-10) AMP-TYCO", txt_pela: "9001540000", txt_longitud: "15", img_pela: "9001540000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 95-25 CU", img_pos: "", txt_matriz: "25", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640317", seccion: "35", img_pin: "640317", txt_pin: "M6 (XCT 35-6) AMP-TYCO", txt_pela: "9001540000", txt_longitud: "15", img_pela: "9001540000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640318", seccion: "35", img_pin: "640318", txt_pin: "M8 (XCT 35-8) AMP-TYCO", txt_pela: "9001540000", txt_longitud: "15", img_pela: "9001540000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640319", seccion: "35", img_pin: "640319", txt_pin: "M10 (XCT 35-10) AMP-TYCO", txt_pela: "9001540000", txt_longitud: "15", img_pela: "9001540000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "645951", seccion: "1,5", img_pin: "645951", txt_pin: "CONTACT M (AMP)", txt_pela: "STRIPAX 9005000000", txt_longitud: "3,6-4,3", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645952", seccion: "1", img_pin: "645952", txt_pin: "CONTACT H (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645952", seccion: "1,5", img_pin: "645952", txt_pin: "CONTACT H (AMP)", txt_pela: "STRIPAX 9005000000", txt_longitud: "3,6-4,3", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645953", seccion: "1", img_pin: "645953", txt_pin: "CONTACT H (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645953", seccion: "1,5", img_pin: "645953", txt_pin: "CONTACT H (AMP)", txt_pela: "STRIPAX 9005000000", txt_longitud: "3,6-4,3", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645954", seccion: "0,25", img_pin: "645954", txt_pin: "CONTACT M (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645954", seccion: "0,5", img_pin: "645954", txt_pin: "CONTACT M (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645955", seccion: "0,25", img_pin: "645955", txt_pin: "CONTACT M (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645955", seccion: "0,5", img_pin: "645955", txt_pin: "CONTACT M (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645957", seccion: "0,25", img_pin: "645957", txt_pin: "CONTACT H (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645957", seccion: "0,5", img_pin: "645957", txt_pin: "CONTACT H (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "645963", seccion: "1", img_pin: "645963", txt_pin: "CONTACTO M 826894-1", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "CEMBRE HF2", img_tenaza: "CEMBRE HF2", txt_pos: "CEMBRE HF2", img_pos: "CEMBRE HF2", txt_matriz: "C", img_regul: "CEMBRE HF2 C", txt_ext: "", img_ext: ""},
   {id: "645964", seccion: "1", img_pin: "645964", txt_pin: "CONTACTO HEMBRA 926893-1", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "CEMBRE HF2", img_tenaza: "CEMBRE HF2", txt_pos: "CEMBRE HF2", img_pos: "CEMBRE HF2", txt_matriz: "C", img_regul: "CEMBRE HF2 C", txt_ext: "", img_ext: ""},
   {id: "645966", seccion: "0,5", img_pin: "645966", txt_pin: "CONTACTO BANDA HEMBRA", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "CEMBRE HF2", img_tenaza: "CEMBRE HF2", txt_pos: "CEMBRE HF2", img_pos: "CEMBRE HF2", txt_matriz: "C", img_regul: "CEMBRE HF2 C", txt_ext: "", img_ext: ""},
   {id: "640233A", seccion: "2,5", img_pin: "640233A", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640243A", seccion: "0,5", img_pin: "640243A", txt_pin: "PUNT. LARGA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640243A", seccion: "1", img_pin: "640243A", txt_pin: "PUNT. LARGA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640243A", seccion: "1,5", img_pin: "640243A", txt_pin: "PUNT. LARGA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640244", seccion: "2,5", img_pin: "640244", txt_pin: "PUNTA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640304A", seccion: "4", img_pin: "640304A", txt_pin: "PRESION M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640304A", seccion: "6", img_pin: "640304A", txt_pin: "PRESION M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "640304D", seccion: "10", img_pin: "640304D", txt_pin: "M5 (XCT 10 - 5) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 50-10 CU", img_pos: "4 E 50-10 CU", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641B888", seccion: "2,5", img_pin: "641B888", txt_pin: "PIN (SORIAU)", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "MrkTENCRIM170510", img_tenaza: "MrkTENCRIM170510", txt_pos: "TP1053", img_pos: "TP1053", txt_matriz: "3", img_regul: "M317 3", txt_ext: "", img_ext: ""},
   {id: "641B888", seccion: "6", img_pin: "641B888", txt_pin: "PIN (SORIAU)", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 2", txt_tenaza: "MrkTENCRIM180510", img_tenaza: "MrkTENCRIM180510", txt_pos: "TP1052", img_pos: "", txt_matriz: "4", img_regul: "M317 4", txt_ext: "", img_ext: ""},
   {id: "641B893", seccion: "1,5", img_pin: "641B893", txt_pin: "conector Souriau 8380E1E071 BM0A", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH450", img_pos: "AZUL", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "", img_ext: ""},
   {id: "641H001", seccion: "0,5", img_pin: "641H001", txt_pin: "PLANA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H001", seccion: "1", img_pin: "641H001", txt_pin: "PLANA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H001", seccion: "1,5", img_pin: "641H001", txt_pin: "PLANA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H002", seccion: "0,5", img_pin: "641H002", txt_pin: "PLANA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H002", seccion: "1", img_pin: "641H002", txt_pin: "PLANA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H002", seccion: "1,5", img_pin: "641H002", txt_pin: "PLANA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H004", seccion: "2,5", img_pin: "641H004", txt_pin: "PLANA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H006", seccion: "2,5", img_pin: "641H006", txt_pin: "Amarillo Negro M3.5", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H008", seccion: "2,5", img_pin: "641H008", txt_pin: "Amarillo Negro M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H009", seccion: "4", img_pin: "641H009", txt_pin: "M6GRUESO", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H009", seccion: "6", img_pin: "641H009", txt_pin: "M6GRUESO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H012", seccion: "2,5", img_pin: "641H012", txt_pin: "Amarillo Negro M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H018", seccion: "4", img_pin: "641H018", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H018", seccion: "6", img_pin: "641H018", txt_pin: "M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H022", seccion: "2,5", img_pin: "641H022", txt_pin: "Amarillo Negro M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H024", seccion: "4", img_pin: "641H024", txt_pin: "M8GRUESO", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H024", seccion: "6", img_pin: "641H024", txt_pin: "M8GRUESO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H025", seccion: "4", img_pin: "641H025", txt_pin: "M4GRUESO", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H025", seccion: "6", img_pin: "641H025", txt_pin: "M4GRUESO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H026", seccion: "2,5", img_pin: "641H026", txt_pin: "HORQ.", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H028", seccion: "4", img_pin: "641H028", txt_pin: "M5GRUESO", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H028", seccion: "6", img_pin: "641H028", txt_pin: "M5GRUESO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 14", txt_tenaza: "AMP 59287-2", img_tenaza: "AMP 59287-2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H031", seccion: "4", img_pin: "641H031", txt_pin: "M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H031", seccion: "6", img_pin: "641H031", txt_pin: "M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H032", seccion: "4", img_pin: "641H032", txt_pin: "M3,5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H032", seccion: "6", img_pin: "641H032", txt_pin: "M3,5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H038", seccion: "0,5", img_pin: "641H038", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H038", seccion: "1", img_pin: "641H038", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H038", seccion: "1,5", img_pin: "641H038", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H039", seccion: "0,5", img_pin: "641H039", txt_pin: "TM2", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H039", seccion: "1", img_pin: "641H039", txt_pin: "TM2", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H039", seccion: "1,5", img_pin: "641H039", txt_pin: "TM2", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H041", seccion: "4", img_pin: "641H041", txt_pin: "TERM", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H041", seccion: "6", img_pin: "641H041", txt_pin: "TERM", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H049", seccion: "4", img_pin: "641H049", txt_pin: "TER", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H049", seccion: "6", img_pin: "641H049", txt_pin: "TER", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H054", seccion: "2,5", img_pin: "641H054", txt_pin: "M3.5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H055", seccion: "4", img_pin: "641H055", txt_pin: "PREAIS", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H055", seccion: "6", img_pin: "641H055", txt_pin: "PREAIS", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H056", seccion: "0,5", img_pin: "641H056", txt_pin: "M3,5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H056", seccion: "1", img_pin: "641H056", txt_pin: "M3,5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H056", seccion: "1,5", img_pin: "641H056", txt_pin: "M3,5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H057", seccion: "4", img_pin: "641H057", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H057", seccion: "6", img_pin: "641H057", txt_pin: "M6", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H059", seccion: "10", img_pin: "641H059", txt_pin: "TERMINAL PRESION M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "10", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 8", txt_tenaza: "AMP 601075-1", img_tenaza: "AMP 601075-1", txt_pos: "AMP 601075-1", img_pos: "AMP 601075-1", txt_matriz: "8", img_regul: "AMP 601075-1 8", txt_ext: "", img_ext: ""},
   {id: "641H061", seccion: "4", img_pin: "641H061", txt_pin: "BANDA", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H061", seccion: "6", img_pin: "641H061", txt_pin: "BANDA", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H065", seccion: "2,5", img_pin: "641H065", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H067", seccion: "2,5", img_pin: "641H067", txt_pin: "M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H068", seccion: "2,5", img_pin: "641H068", txt_pin: "FASTON BANDERA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H069", seccion: "0,5", img_pin: "641H069", txt_pin: "FAST. BANDERA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H069", seccion: "1", img_pin: "641H069", txt_pin: "FAST. BANDERA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H069", seccion: "1,5", img_pin: "641H069", txt_pin: "FAST. BANDERA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H070", seccion: "2,5", img_pin: "641H070", txt_pin: "FASTON H LENGÜETA M", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H072", seccion: "0,5", img_pin: "641H072", txt_pin: "HORQ M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H072", seccion: "1", img_pin: "641H072", txt_pin: "HORQ M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H072", seccion: "1,5", img_pin: "641H072", txt_pin: "HORQ M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H074", seccion: "0,5", img_pin: "641H074", txt_pin: "FASTON H tamaño de cable de 0.3 a 1.5 mm2", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H074", seccion: "1", img_pin: "641H074", txt_pin: "FASTON H tamaño de cable de 0.3 a 1.5 mm2", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H074", seccion: "1,5", img_pin: "641H074", txt_pin: "FASTON H tamaño de cable de 0.3 a 1.5 mm2", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H075", seccion: "4", img_pin: "641H075", txt_pin: "PALA", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H075", seccion: "6", img_pin: "641H075", txt_pin: "PALA", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H077", seccion: "1", img_pin: "641H077", txt_pin: "FASTON H", txt_pela: "STRIPAX-1", txt_longitud: "5.5 – 6.5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 674655", img_tenaza: "AMP 674655", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H077", seccion: "1,5", img_pin: "641H077", txt_pin: "FASTON H", txt_pela: "STRIPAX 9005000000", txt_longitud: "5.5 – 6.5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 674655", img_tenaza: "AMP 674655", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H077", seccion: "2,5", img_pin: "641H077", txt_pin: "FASTON H", txt_pela: "STRIPAX 9005000000", txt_longitud: "5.5 – 6.5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 674655", img_tenaza: "AMP 674655", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H079", seccion: "4", img_pin: "641H079", txt_pin: "CERRM3,5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H079", seccion: "6", img_pin: "641H079", txt_pin: "CERRM3,5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H081", seccion: "2,5", img_pin: "641H081", txt_pin: "HORQCLIP", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H082", seccion: "0,5", img_pin: "641H082", txt_pin: "T. FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H082", seccion: "1", img_pin: "641H082", txt_pin: "T. FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H082", seccion: "1,5", img_pin: "641H082", txt_pin: "T. FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", img_tenaza: "TYCO ELECTRONICS TETRA-CRIMP", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H084", seccion: "0,5", img_pin: "641H084", txt_pin: "H. LENGU M", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H084", seccion: "1", img_pin: "641H084", txt_pin: "H. LENGU M", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H084", seccion: "1,5", img_pin: "641H084", txt_pin: "H. LENGU M", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H085", seccion: "10", img_pin: "641H085", txt_pin: "PRESION PALA", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "10", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 8", txt_tenaza: "AMP 601075-1", img_tenaza: "AMP 601075-1", txt_pos: "AMP 601075-1", img_pos: "AMP 601075-1", txt_matriz: "8", img_regul: "AMP 601075-1 8", txt_ext: "", img_ext: ""},
   {id: "641H089", seccion: "4", img_pin: "641H089", txt_pin: "CERRM4", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H089", seccion: "6", img_pin: "641H089", txt_pin: "CERRM4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H090", seccion: "1,5", img_pin: "641H090", txt_pin: "PRESION M10", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H090", seccion: "2,5", img_pin: "641H090", txt_pin: "PRESION M10", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H098", seccion: "2,5", img_pin: "641H098", txt_pin: "FASTON 2.8", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10001", seccion: "0,5", img_pin: "641H10001", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10001", seccion: "1", img_pin: "641H10001", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10001", seccion: "1,5", img_pin: "641H10001", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10002", seccion: "2,5", img_pin: "641H10002", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10003", seccion: "0,5", img_pin: "641H10003", txt_pin: "M6", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10003", seccion: "1", img_pin: "641H10003", txt_pin: "M6", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10003", seccion: "1,5", img_pin: "641H10003", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10004", seccion: "2,5", img_pin: "641H10004", txt_pin: "M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10005", seccion: "4", img_pin: "641H10005", txt_pin: "M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10005", seccion: "6", img_pin: "641H10005", txt_pin: "M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10006", seccion: "0,5", img_pin: "641H10006", txt_pin: "PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10006", seccion: "1", img_pin: "641H10006", txt_pin: "PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10006", seccion: "1,5", img_pin: "641H10006", txt_pin: "PUNTA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10007", seccion: "2,5", img_pin: "641H10007", txt_pin: "PUNTA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10008", seccion: "0,5", img_pin: "641H10008", txt_pin: "FASTON TOPE", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10008", seccion: "1", img_pin: "641H10008", txt_pin: "FASTON TOPE", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10008", seccion: "1,5", img_pin: "641H10008", txt_pin: "FASTON TOPE", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10009", seccion: "0,5", img_pin: "641H10009", txt_pin: "PUNTA PLANA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10009", seccion: "1", img_pin: "641H10009", txt_pin: "PUNTA PLANA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10009", seccion: "1,5", img_pin: "641H10009", txt_pin: "PUNTA PLANA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10010", seccion: "2,5", img_pin: "641H10010", txt_pin: "PUNTA PLANA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10011", seccion: "4", img_pin: "641H10011", txt_pin: "TUB REFORZADO M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10011", seccion: "6", img_pin: "641H10011", txt_pin: "TUB REFORZADO M6", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10012", seccion: "2,5", img_pin: "641H10012", txt_pin: "M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10013", seccion: "2,5", img_pin: "641H10013", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10014", seccion: "0,5", img_pin: "641H10014", txt_pin: "M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10014", seccion: "1", img_pin: "641H10014", txt_pin: "M3", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10014", seccion: "1,5", img_pin: "641H10014", txt_pin: "M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10015", seccion: "16", img_pin: "641H10015", txt_pin: "TUBULAR M6", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-16-50F", img_pos: "H1-16-50F", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10016", seccion: "16", img_pin: "641H10016", txt_pin: "TUBULAR M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-16-50F", img_pos: "H1-16-50F", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10017", seccion: "4", img_pin: "641H10017", txt_pin: "AMARIL/NEGRO M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10017", seccion: "6", img_pin: "641H10017", txt_pin: "AMARIL/NEGRO M4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10018", seccion: "4", img_pin: "641H10018", txt_pin: "AMARIL/NEGRO M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10018", seccion: "6", img_pin: "641H10018", txt_pin: "AMARIL/NEGRO M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10019", seccion: "4", img_pin: "641H10019", txt_pin: "TUB M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10019", seccion: "6", img_pin: "641H10019", txt_pin: "TUB M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10020", seccion: "2,5", img_pin: "641H10020", txt_pin: "HORQ M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10021", seccion: "0,5", img_pin: "641H10021", txt_pin: "HORQ", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10021", seccion: "1", img_pin: "641H10021", txt_pin: "HORQ", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10021", seccion: "1,5", img_pin: "641H10021", txt_pin: "HORQ", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10022", seccion: "2,5", img_pin: "641H10022", txt_pin: "HORQ M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10023", seccion: "4", img_pin: "641H10023", txt_pin: "AMARILLO-NEGRO M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", img_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10023", seccion: "6", img_pin: "641H10023", txt_pin: "AMARILLO-NEGRO M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", img_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10024", seccion: "4", img_pin: "641H10024", txt_pin: "AMARILLO-NEGRO M8", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", img_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10024", seccion: "6", img_pin: "641H10024", txt_pin: "AMARILLO-NEGRO M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", img_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10025", seccion: "10", img_pin: "641H10025", txt_pin: "TUBULAR M8", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-10-35F", img_pos: "H1-10-35F", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10036", seccion: "4", img_pin: "641H10036", txt_pin: "M5 (ancho)", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10036", seccion: "6", img_pin: "641H10036", txt_pin: "M5 (ancho)", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10037", seccion: "4", img_pin: "641H10037", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10037", seccion: "6", img_pin: "641H10037", txt_pin: "M4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10038", seccion: "0,5", img_pin: "641H10038", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10038", seccion: "1", img_pin: "641H10038", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10038", seccion: "1,5", img_pin: "641H10038", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10039", seccion: "0,5", img_pin: "", txt_pin: "HORQUILLA", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10039", seccion: "1", img_pin: "", txt_pin: "HORQUILLA", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10039", seccion: "1,5", img_pin: "", txt_pin: "HORQUILLA", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10040", seccion: "10", img_pin: "641H10040", txt_pin: "TUBULAR M6", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-10-35F", img_pos: "H1-10-35F", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10041", seccion: "10", img_pin: "641H10041", txt_pin: "TUBULAR M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-10-35F", img_pos: "H1-10-35F", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10042", seccion: "4", img_pin: "641H10042", txt_pin: "PALA", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10042", seccion: "6", img_pin: "641H10042", txt_pin: "PALA", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10043", seccion: "0,5", img_pin: "641H10043", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10043", seccion: "1", img_pin: "641H10043", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10043", seccion: "1,5", img_pin: "641H10043", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10044", seccion: "0,5", img_pin: "641H10044", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10044", seccion: "1", img_pin: "641H10044", txt_pin: "M4", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10044", seccion: "1,5", img_pin: "641H10044", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10045", seccion: "0,5", img_pin: "", txt_pin: "AISLANTE FINO", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10045", seccion: "1", img_pin: "", txt_pin: "AISLANTE FINO", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10045", seccion: "1,5", img_pin: "", txt_pin: "AISLANTE FINO", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10046", seccion: "0,5", img_pin: "", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10046", seccion: "1", img_pin: "", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10046", seccion: "1,5", img_pin: "", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10047", seccion: "0,5", img_pin: "641H10047", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10047", seccion: "1", img_pin: "641H10047", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10047", seccion: "1,5", img_pin: "641H10047", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10048", seccion: "0,5", img_pin: "641H10048", txt_pin: "PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10048", seccion: "1", img_pin: "641H10048", txt_pin: "PUNTA", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10048", seccion: "1,5", img_pin: "641H10048", txt_pin: "PUNTA", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10050", seccion: "4", img_pin: "641H10050", txt_pin: "M10", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10050", seccion: "6", img_pin: "641H10050", txt_pin: "M10", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10053", seccion: "4", img_pin: "641H10053", txt_pin: "PUNTERA GRIS", txt_pela: "STRIPAX 9005000000", txt_longitud: "9 – 10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 17", txt_tenaza: "WEIDMÜLLER PZ 6/5", img_tenaza: "WEIDMULLER PZ 65", txt_pos: "WEIDMÜLLER PZ 6/5", img_pos: "WEIDMULLER PZ 65", txt_matriz: "4", img_regul: "WEIDMULLER PZ 65 4", txt_ext: "", img_ext: ""},
   {id: "641H10054", seccion: "6", img_pin: "641H10054", txt_pin: "PUNTERA AMARILLA", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "9 – 10", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 17", txt_tenaza: "WEIDMÜLLER PZ 6/5", img_tenaza: "WEIDMULLER PZ 65", txt_pos: "WEIDMÜLLER PZ 6/5", img_pos: "WEIDMULLER PZ 65", txt_matriz: "6", img_regul: "WEIDMULLER PZ 65 6", txt_ext: "", img_ext: ""},
   {id: "641H10055", seccion: "0,5", img_pin: "641H10055", txt_pin: "PUNTERA BLANCO", txt_pela: "STRIPAX-1", txt_longitud: "9 – 10", img_pela: "STRIPAX-1", img_obs: "Ayuda 17", txt_tenaza: "WEIDMÜLLER PZ 6/5", img_tenaza: "WEIDMULLER PZ 65", txt_pos: "WEIDMÜLLER PZ 6/5", img_pos: "WEIDMULLER PZ 65", txt_matriz: "0,25-0,5", img_regul: "WEIDMULLER PZ 65 0,25-0,5", txt_ext: "", img_ext: ""},
   {id: "641H10056", seccion: "1", img_pin: "641H10056", txt_pin: "PUNTERA ROJO", txt_pela: "STRIPAX-1", txt_longitud: "9 – 10", img_pela: "STRIPAX-1", img_obs: "Ayuda 17", txt_tenaza: "WEIDMÜLLER PZ 6/5", img_tenaza: "WEIDMULLER PZ 65", txt_pos: "WEIDMÜLLER PZ 6/5", img_pos: "WEIDMULLER PZ 65", txt_matriz: "0,75-1,5", img_regul: "WEIDMULLER PZ 65 0,75-1,5", txt_ext: "", img_ext: ""},
   {id: "641H10057", seccion: "1,5", img_pin: "641H10057", txt_pin: "PUNTERA NEGRO", txt_pela: "STRIPAX 9005000000", txt_longitud: "9 – 10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 17", txt_tenaza: "WEIDMÜLLER PZ 6/5", img_tenaza: "WEIDMULLER PZ 65", txt_pos: "WEIDMÜLLER PZ 6/5", img_pos: "WEIDMULLER PZ 65", txt_matriz: "0,75-1,5", img_regul: "WEIDMULLER PZ 65 0,75-1,5", txt_ext: "", img_ext: ""},
   {id: "641H10058", seccion: "2,5", img_pin: "641H10058", txt_pin: "PUNTERA AZUL", txt_pela: "STRIPAX 9005000000", txt_longitud: "9 – 10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 17", txt_tenaza: "WEIDMÜLLER PZ 6/5", img_tenaza: "WEIDMULLER PZ 65", txt_pos: "WEIDMÜLLER PZ 6/5", img_pos: "WEIDMULLER PZ 65", txt_matriz: "2,5", img_regul: "WEIDMULLER PZ 65 2,5", txt_ext: "", img_ext: ""},
   {id: "641H10059", seccion: "0,5", img_pin: "641H10059", txt_pin: "M5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10059", seccion: "1", img_pin: "641H10059", txt_pin: "M5", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10059", seccion: "1,5", img_pin: "641H10059", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10060", seccion: "2,5", img_pin: "641H10060", txt_pin: "M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10061", seccion: "2,5", img_pin: "641H10061", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH2", img_tenaza: "MECATRACTION TH2", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10063", seccion: "16", img_pin: "641H10063", txt_pin: "TUBULAR M5", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-16-50F", img_pos: "H1-16-50F", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10064", seccion: "16", img_pin: "641H10064", txt_pin: "TUBULAR M10", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-16-50F", img_pos: "H1-16-50F", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10067", seccion: "10", img_pin: "641H10067", txt_pin: "M4 (XCT 10 - 4) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 50-10 CU", img_pos: "4 E 50-10 CU", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10069", seccion: "0,5", img_pin: "641H10069", txt_pin: "HORQUILLA M3", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10069", seccion: "1", img_pin: "641H10069", txt_pin: "HORQUILLA M3", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H10069", seccion: "1,5", img_pin: "641H10069", txt_pin: "HORQUILLA M3", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H114", seccion: "2,5", img_pin: "641H114", txt_pin: "TERMINAL AZUL M2", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H115", seccion: "1,5", img_pin: "641H115", txt_pin: "PRESION M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H115", seccion: "2,5", img_pin: "641H115", txt_pin: "PRESION M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H117", seccion: "1,5", img_pin: "641H117", txt_pin: "PRESION M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H117", seccion: "2,5", img_pin: "641H117", txt_pin: "PRESION M6", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H20001", seccion: "0,5", img_pin: "641H20001", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H20001", seccion: "1", img_pin: "641H20001", txt_pin: "FASTON", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641H20001", seccion: "1,5", img_pin: "641H20001", txt_pin: "FASTON", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 16", txt_tenaza: "MECATRACION TH1", img_tenaza: "MECATRACION TH1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M026", seccion: "1,5", img_pin: "641M026", txt_pin: "M PLAT HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M027", seccion: "2,5", img_pin: "641M027", txt_pin: "M PLAT HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M028", seccion: "4", img_pin: "641M028", txt_pin: "M PLAT HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "2", img_regul: "ASTRO TOOL CORP. 621205 2", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M029", seccion: "1,5", img_pin: "641M029", txt_pin: "H PLAT HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M030", seccion: "2,5", img_pin: "641M030", txt_pin: "H PLAT HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M031", seccion: "4", img_pin: "641M031", txt_pin: "H PLAT HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "2", img_regul: "ASTRO TOOL CORP. 621205 2", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M033", seccion: "1,5", img_pin: "641M033", txt_pin: "M PLAT HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M034", seccion: "1,5", img_pin: "641M034", txt_pin: "H PLAT HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M035", seccion: "0,25", img_pin: "641M035", txt_pin: "CONTACTO HEMBRA", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "28-24", img_regul: "AMP 58495-1 28-24", txt_ext: "", img_ext: ""},
   {id: "641M045", seccion: "0,25", img_pin: "641M045", txt_pin: "CONTACT H", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "", img_ext: ""},
   {id: "641M045", seccion: "0,5", img_pin: "641M045", txt_pin: "CONTACT H", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "24-20", img_regul: "AMP 58495-1 24-20", txt_ext: "", img_ext: ""},
   {id: "641M049", seccion: "2,5", img_pin: "641M049", txt_pin: "M PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M050", seccion: "2,5", img_pin: "641M050", txt_pin: "H PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M051", seccion: "1,5", img_pin: "641M051", txt_pin: "M PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M052", seccion: "1,5", img_pin: "641M052", txt_pin: "H PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M059", seccion: "0,25", img_pin: "641M059", txt_pin: "PIN (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "9003700000", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC1", img_regul: "HARTING 09 99 000 0656 FC1", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M059", seccion: "0,5", img_pin: "641M059", txt_pin: "PIN (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC2", img_regul: "HARTING 09 99 000 0656 FC2", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M065", seccion: "1,5", img_pin: "641M065", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M068", seccion: "1", img_pin: "641M068", txt_pin: "H PLAT HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M069", seccion: "1", img_pin: "641M069", txt_pin: "M PLAT HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M070", seccion: "1", img_pin: "641M070", txt_pin: "H PLAT HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M071", seccion: "0,5", img_pin: "641M071", txt_pin: "M PLAT HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M081", seccion: "0,5", img_pin: "641M081", txt_pin: "H PLAT HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M082", seccion: "1", img_pin: "641M082", txt_pin: "M PLAT HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M084", seccion: "1,5", img_pin: "641M084", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10012", seccion: "0,5", img_pin: "641M10012", txt_pin: "PIN HEMBRA 928.999-1 AMP", txt_pela: "STRIPAX-1", txt_longitud: "3,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "TENAZA AMP: 539635-1", img_tenaza: "TENAZA AMP 539635-1", txt_pos: "539682-2", img_pos: "539682-2", txt_matriz: "0,5", img_regul: "539682-2 0,5", txt_ext: "822-7723", img_ext: "822-7723"},
   {id: "641M10044", seccion: "0,5", img_pin: "641M10044", txt_pin: "CONECTOR PIN M DELPHI", txt_pela: "STRIPAX-1", txt_longitud: "5,6", img_pela: "STRIPAX-1", img_obs: "Ayuda 7", txt_tenaza: "HT31012451-1", img_tenaza: "HT31012451-1", txt_pos: "HT31012451-1", img_pos: "HT31012451-1", txt_matriz: "1", img_regul: "HT31012451-1 1", txt_ext: "DMC DRK 289", img_ext: "DMC DRK 289"},
   {id: "641M10045", seccion: "0,5", img_pin: "641M10045", txt_pin: "CONECTOR PIN H DELPHI", txt_pela: "STRIPAX-1", txt_longitud: "5,6", img_pela: "STRIPAX-1", img_obs: "Ayuda 7", txt_tenaza: "HT31012451-1", img_tenaza: "HT31012451-1", txt_pos: "HT31012451-1", img_pos: "HT31012451-1", txt_matriz: "1", img_regul: "HT31012451-1 1", txt_ext: "DMC DRK 289", img_ext: "DMC DRK 289"},
   {id: "641M10091", seccion: "10", img_pin: "641M10091", txt_pin: "M PLAT HC", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "10", img_regul: "NUEVA HARTING 09 99 000 0377 10", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M10092", seccion: "10", img_pin: "641M10092", txt_pin: "H PLAT HC", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "10", img_regul: "NUEVA HARTING 09 99 000 0377 10", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M10100", seccion: "0,25", img_pin: "641M10100", txt_pin: "ROLLO (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "9003700000", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC1", img_regul: "HARTING 09 99 000 0656 FC1", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M10100", seccion: "0,5", img_pin: "641M10100", txt_pin: "ROLLO (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC2", img_regul: "HARTING 09 99 000 0656 FC2", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M10100 FC2", seccion: "0,5", img_pin: "641M10100 FC2", txt_pin: "ROLLO  (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 4", txt_tenaza: "HARTING PREMIUM 09990000620", img_tenaza: "HARTING PREMIUM 09990000620", txt_pos: "09990000622 (FC2)", img_pos: "09990000622 (FC2)", txt_matriz: "0,32-0,56", img_regul: "FC2 0,32-0,56", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M10157", seccion: "1", img_pin: "641M10157", txt_pin: "PIN H", txt_pela: "STRIPAX-1", txt_longitud: "4,45", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "MOLEX 63811-5500", img_tenaza: "MOLEX 63811-5500", txt_pos: "MOLEX 63811-5500", img_pos: "MOLEX 63811-5500", txt_matriz: "18", img_regul: "MOLEX 63811-5500 18", txt_ext: "", img_ext: ""},
   {id: "641M10158", seccion: "1", img_pin: "641M10158", txt_pin: "PIN M", txt_pela: "STRIPAX-1", txt_longitud: "4,45", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "MOLEX 63811-5500", img_tenaza: "MOLEX 63811-5500", txt_pos: "MOLEX 63811-5500", img_pos: "MOLEX 63811-5500", txt_matriz: "18", img_regul: "MOLEX 63811-5500 18", txt_ext: "", img_ext: ""},
   {id: "641M10168", seccion: "16", img_pin: "641M10168", txt_pin: "PIN HEMBRA 16mm2 HAN TC 100 A", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "19", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0853", img_pos: "09 99 000 0853", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10169", seccion: "16", img_pin: "641M10169", txt_pin: "PIN MACHO 16mm2 HAN TC 100A", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "19", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0853", img_pos: "09 99 000 0853", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10185", seccion: "2,5", img_pin: "641M10185", txt_pin: "PIN HEMBRA 51511-12-T12 ITT Cannon Veam", txt_pela: "STRIPAX 9005000000", txt_longitud: "11", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10186", seccion: "1", img_pin: "641M10186", txt_pin: "PIN HEMBRA DORADO T16/1-2mm2 REF.51511-1 ITT Cannon Veam", txt_pela: "STRIPAX-1", txt_longitud: "12", img_pela: "STRIPAX-1", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "18", img_regul: "DMC FT8 18", txt_ext: "VEAM ET16VBN", img_ext: "VEAM ET16VBN"},
   {id: "641M10186", seccion: "1,5", img_pin: "641M10186", txt_pin: "PIN HEMBRA DORADO T16/1-2mm2 REF.51511-1 ITT Cannon Veam", txt_pela: "STRIPAX 9005000000", txt_longitud: "12", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "VEAM ET16VBN", img_ext: "VEAM ET16VBN"},
   {id: "641M10187", seccion: "1", img_pin: "641M10187", txt_pin: "PIN HEMBRA 51511-12-20T12 ITT Cannon Veam", txt_pela: "STRIPAX-1", txt_longitud: "12", img_pela: "STRIPAX-1", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "18", img_regul: "DMC FT8 18", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10187", seccion: "1,5", img_pin: "641M10187", txt_pin: "PIN HEMBRA 51511-12-20T12 ITT Cannon Veam", txt_pela: "STRIPAX 9005000000", txt_longitud: "12", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10188", seccion: "2,5", img_pin: "641M10188", txt_pin: "PIN HEMBRA 51511-16-26T12 ITT Cannon Veam", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10191", seccion: "1", img_pin: "641M10191", txt_pin: "PIN MACHO DORADO T16/1-2mm2 REF.51513-16 ITT Cannon Veam", txt_pela: "STRIPAX-1", txt_longitud: "12", img_pela: "STRIPAX-1", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "18", img_regul: "DMC FT8 18", txt_ext: "VEAM ET16VBN", img_ext: "VEAM ET16VBN"},
   {id: "641M10191", seccion: "1,5", img_pin: "641M10191", txt_pin: "PIN MACHO DORADO T16/1-2mm2 REF.51513-16 ITT Cannon Veam", txt_pela: "STRIPAX 9005000000", txt_longitud: "12", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "VEAM ET16VBN", img_ext: "VEAM ET16VBN"},
   {id: "641M10192", seccion: "1", img_pin: "641M10192", txt_pin: "PIN MACHO 51513-12-20T12 ITT Cannon Veam", txt_pela: "STRIPAX-1", txt_longitud: "12", img_pela: "STRIPAX-1", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "18", img_regul: "DMC FT8 18", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10192", seccion: "1,5", img_pin: "641M10192", txt_pin: "PIN MACHO 51513-12-20T12 ITT Cannon Veam", txt_pela: "STRIPAX 9005000000", txt_longitud: "12", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10195", seccion: "1", img_pin: "641M10195", txt_pin: "M (SOURIAU)", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "18", img_regul: "DMC AF8 18", txt_ext: "481-046", img_ext: "481-046"},
   {id: "641M10195", seccion: "1,5", img_pin: "641M10195", txt_pin: "M (SOURIAU)", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "481-046", img_ext: "481-046"},
   {id: "641M10196", seccion: "1", img_pin: "641M10196", txt_pin: "H (SOURIAU)", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "18", img_regul: "DMC AF8 18", txt_ext: "481-046", img_ext: "481-046"},
   {id: "641M10196", seccion: "1,5", img_pin: "641M10196", txt_pin: "H (SOURIAU)", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "481-046", img_ext: "481-046"},
   {id: "641M10199", seccion: "6", img_pin: "641M10199", txt_pin: "M", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "13", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 2", txt_tenaza: "M317", img_tenaza: "M317", txt_pos: "", img_pos: "", txt_matriz: "4", img_regul: "M317 4", txt_ext: "", img_ext: ""},
   {id: "641M10208", seccion: "1", img_pin: "641M10208", txt_pin: "PIN H", txt_pela: "STRIPAX-1", txt_longitud: "4,45", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "MOLEX 63811-5600", img_tenaza: "MOLEX 63811-5600", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10208", seccion: "1,5", img_pin: "641M10208", txt_pin: "PIN H", txt_pela: "STRIPAX 9005000000", txt_longitud: "4,45", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "MOLEX 63811-5600", img_tenaza: "MOLEX 63811-5600", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10209", seccion: "1", img_pin: "641M10209", txt_pin: "PIN M", txt_pela: "STRIPAX-1", txt_longitud: "4,45", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "MOLEX 63811-5600", img_tenaza: "MOLEX 63811-5600", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10209", seccion: "1,5", img_pin: "641M10209", txt_pin: "PIN M", txt_pela: "STRIPAX 9005000000", txt_longitud: "4,45", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "MOLEX 63811-5600", img_tenaza: "MOLEX 63811-5600", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10211", seccion: "1", img_pin: "641M10211", txt_pin: "PIN MACHO REF. 51513- 16S-20T12 ITT CANNON", txt_pela: "STRIPAX-1", txt_longitud: "10", img_pela: "STRIPAX-1", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "18", img_regul: "DMC FT8 18", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10211", seccion: "1,5", img_pin: "641M10211", txt_pin: "PIN MACHO REF. 51513- 16S-20T12 ITT CANNON", txt_pela: "STRIPAX 9005000000", txt_longitud: "10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "VEAM ET12VBN", img_ext: "VEAM ET12VBN"},
   {id: "641M10219", seccion: "1,5", img_pin: "641M10219", txt_pin: "PIN HEMBRA CRIMPAR 594179 ERNI", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10235", seccion: "10", img_pin: "641M10235", txt_pin: "PIN MACHO HAN TC 70A", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0852", img_pos: "09 99 000 0852", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10236", seccion: "10", img_pin: "641M10236", txt_pin: "PIN HEMBRA HAN TC 70A", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0852", img_pos: "09 99 000 0852", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10253", seccion: "0,5", img_pin: "641M10253", txt_pin: "M (AWG24-20)", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA MH800", img_tenaza: "TENAZA MH800", txt_pos: "09990000531", img_pos: "09990000531", txt_matriz: "6", img_regul: "MH800 6", txt_ext: "", img_ext: ""},
   {id: "641M10258", seccion: "0,5", img_pin: "641M10258", txt_pin: "CONTACTO MACHO DORADO 0,5- 2MM2 350547-6", txt_pela: "STRIPAX-1", txt_longitud: "6", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 91500-1", img_tenaza: "AMP 91500-1", txt_pos: "AMP 91500-1", img_pos: "AMP 91500-1", txt_matriz: "20-18", img_regul: "AMP 91500-1 [20-18]", txt_ext: "1804030-1", img_ext: "1804030-1"},
   {id: "641M10258", seccion: "1", img_pin: "641M10258", txt_pin: "CONTACTO MACHO DORADO 0,5- 2MM2 350547-6", txt_pela: "STRIPAX-1", txt_longitud: "6", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 91500-1", img_tenaza: "AMP 91500-1", txt_pos: "AMP 91500-1", img_pos: "AMP 91500-1", txt_matriz: "16-14", img_regul: "AMP 91500-1 [16-14]", txt_ext: "1804030-1", img_ext: "1804030-1"},
   {id: "641M10258", seccion: "1,5", img_pin: "641M10258", txt_pin: "CONTACTO MACHO DORADO 0,5- 2MM2 350547-6", txt_pela: "STRIPAX 9005000000", txt_longitud: "6", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 91500-1", img_tenaza: "AMP 91500-1", txt_pos: "AMP 91500-1", img_pos: "AMP 91500-1", txt_matriz: "16-14", img_regul: "AMP 91500-1 [16-14]", txt_ext: "1804030-1", img_ext: "1804030-1"},
   {id: "641M10265", seccion: "1", img_pin: "641M10265", txt_pin: "H (AMPHENOL)", txt_pela: "STRIPAX-1", txt_longitud: "6", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "18", img_regul: "DMC AF8 18", txt_ext: "00610100000", img_ext: "00610100000"},
   {id: "641M10265", seccion: "1,5", img_pin: "641M10265", txt_pin: "H (AMPHENOL)", txt_pela: "STRIPAX 9005000000", txt_longitud: "6", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "00610100000", img_ext: "00610100000"},
   {id: "641M10266", seccion: "1", img_pin: "641M10266", txt_pin: "M (AMPHENOL)", txt_pela: "STRIPAX-1", txt_longitud: "6", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "18", img_regul: "DMC AF8 18", txt_ext: "674-1710", img_ext: "674-1710"},
   {id: "641M10266", seccion: "1,5", img_pin: "641M10266", txt_pin: "M (AMPHENOL)", txt_pela: "STRIPAX 9005000000", txt_longitud: "6", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH163", img_pos: "AZUL", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "674-1710", img_ext: "674-1710"},
   {id: "641M10267", seccion: "6", img_pin: "641M10267", txt_pin: "PIN HEMBRA HAN TC 70A (SIN LOCATOR)", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "6", img_regul: "NUEVA HARTING 09 99 000 0377 6", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M10268", seccion: "6", img_pin: "641M10268", txt_pin: "PIN MACHO HAN TC 70A (SIN LOCATOR)", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "6", img_regul: "NUEVA HARTING 09 99 000 0377 6", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M10274", seccion: "1", img_pin: "641M10274", txt_pin: "M (VEAM/ITT CANNON)", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH378", img_pos: "TH378", txt_matriz: "18", img_regul: "DMC AF8 18", txt_ext: "", img_ext: ""},
   {id: "641M10275", seccion: "0,5", img_pin: "641M10275", txt_pin: "M (VEAM/ITT CANNON)", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH378", img_pos: "TH378", txt_matriz: "20", img_regul: "DMC AF8 20", txt_ext: "", img_ext: ""},
   {id: "641M10276", seccion: "1,5", img_pin: "641M10276", txt_pin: "M (VEAM/ITT CANNON)", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH378", img_pos: "TH378", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "", img_ext: ""},
   {id: "641M10277", seccion: "0,5", img_pin: "641M10277", txt_pin: "H (VEAM/ITT CANNON)", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH378", img_pos: "TH378", txt_matriz: "20", img_regul: "DMC AF8 20", txt_ext: "", img_ext: ""},
   {id: "641M10278", seccion: "1", img_pin: "641M10278", txt_pin: "H (VEAM/ITT CANNON)", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH378", img_pos: "TH378", txt_matriz: "18", img_regul: "DMC AF8 18", txt_ext: "", img_ext: ""},
   {id: "641M10279", seccion: "1,5", img_pin: "641M10279", txt_pin: "H (VEAM/ITT CANNON)", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TH378", img_pos: "TH378", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "", img_ext: ""},
   {id: "641M10292", seccion: "0,25", img_pin: "641M10292", txt_pin: "PIN MACHO 1,5 0151071-20-OG HYPERTAC", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "9003700000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "24", img_regul: "DMC FT8 24", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10292", seccion: "0,5", img_pin: "641M10292", txt_pin: "PIN MACHO 1,5 0151071-20-OG HYPERTAC", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "20", img_regul: "DMC FT8 20", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10292", seccion: "1", img_pin: "641M10292", txt_pin: "PIN MACHO 1,5 0151071-20-OG HYPERTAC", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "18", img_regul: "DMC FT8 18", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10292", seccion: "1,5", img_pin: "641M10292", txt_pin: "PIN MACHO 1,5 0151071-20-OG HYPERTAC", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10292", seccion: "2,5", img_pin: "641M10292", txt_pin: "PIN MACHO 1,5 0151071-20-OG HYPERTAC", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10293", seccion: "0,25", img_pin: "641M10293", txt_pin: "PIN HEMBRA 1,5 0151832- 20-N1 HYPERTAC", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "9003700000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "24", img_regul: "DMC FT8 24", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10293", seccion: "0,5", img_pin: "641M10293", txt_pin: "PIN HEMBRA 1,5 0151832- 20-N1 HYPERTAC", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "20", img_regul: "DMC FT8 20", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10293", seccion: "1", img_pin: "641M10293", txt_pin: "PIN HEMBRA 1,5 0151832- 20-N1 HYPERTAC", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "18", img_regul: "DMC FT8 18", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10293", seccion: "1,5", img_pin: "641M10293", txt_pin: "PIN HEMBRA 1,5 0151832- 20-N1 HYPERTAC", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10293", seccion: "2,5", img_pin: "641M10293", txt_pin: "PIN HEMBRA 1,5 0151832- 20-N1 HYPERTAC", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "SD-0150000012", img_ext: "SD-0150000012"},
   {id: "641M10302", seccion: "0,5", img_pin: "641M10302", txt_pin: "H AWG18-22", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA MH800", img_tenaza: "TENAZA MH800", txt_pos: "09990000531", img_pos: "09990000531", txt_matriz: "6", img_regul: "MH800 6", txt_ext: "", img_ext: ""},
   {id: "641M107", seccion: "2,5", img_pin: "641M107", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M112", seccion: "2,5", img_pin: "641M112", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M117", seccion: "1", img_pin: "641M117", txt_pin: "PIN (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC3", img_regul: "HARTING 09 99 000 0656 FC3", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M117", seccion: "1,5", img_pin: "641M117", txt_pin: "PIN (HARTING)", txt_pela: "STRIPAX 9005000000", txt_longitud: "4", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC3", img_regul: "HARTING 09 99 000 0656 FC3", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M149", seccion: "1,5", img_pin: "641M149", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M151", seccion: "3", img_pin: "641M151", txt_pin: "M PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M153", seccion: "3", img_pin: "641M153", txt_pin: "H PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M155", seccion: "1", img_pin: "641M155", txt_pin: "ROLLO (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC3", img_regul: "HARTING 09 99 000 0656 FC3", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M155", seccion: "1,5", img_pin: "641M155", txt_pin: "ROLLO (HARTING)", txt_pela: "STRIPAX 9005000000", txt_longitud: "4", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 4", txt_tenaza: "HARTING 09 99 000 0656", img_tenaza: "HARTING 09 99 000 0656", txt_pos: "HARTING 09 99 000 0656", img_pos: "HARTING 09 99 000 0656", txt_matriz: "FC3", img_regul: "HARTING 09 99 000 0656 FC3", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M155 FC3", seccion: "1", img_pin: "641M155 FC3", txt_pin: "ROLLO (HARTING)", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 4", txt_tenaza: "HARTING PREMIUM 09990000620", img_tenaza: "HARTING PREMIUM 09990000620", txt_pos: "09990000623 (FC3)", img_pos: "09990000623 (FC3)", txt_matriz: "0,5-1,3", img_regul: "FC3 0,5-1,3", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M155 FC3", seccion: "1,5", img_pin: "641M155 FC3", txt_pin: "ROLLO (HARTING)", txt_pela: "STRIPAX 9005000000", txt_longitud: "4", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 4", txt_tenaza: "HARTING PREMIUM 09990000620", img_tenaza: "HARTING PREMIUM 09990000620", txt_pos: "09990000623 (FC3)", img_pos: "09990000623 (FC3)", txt_matriz: "1,0-1,5", img_regul: "FC3 1,0-1,5", txt_ext: "843-6255", img_ext: "843-6255"},
   {id: "641M164", seccion: "0,5", img_pin: "641M164", txt_pin: "TERMINAL HORQUILLA M", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M164", seccion: "1", img_pin: "641M164", txt_pin: "TERMINAL HORQUILLA M", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M164", seccion: "1,5", img_pin: "641M164", txt_pin: "TERMINAL HORQUILLA M", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M165", seccion: "2,5", img_pin: "641M165", txt_pin: "HORQM3,5", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47387", img_tenaza: "AMP 47387", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M166", seccion: "0,5", img_pin: "641M166", txt_pin: "TERMINAL HORQUILLA M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M166", seccion: "1", img_pin: "641M166", txt_pin: "TERMINAL HORQUILLA M4", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M166", seccion: "1,5", img_pin: "641M166", txt_pin: "TERMINAL HORQUILLA M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M180", seccion: "4", img_pin: "641M180", txt_pin: "HORQCLIP", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M180", seccion: "6", img_pin: "641M180", txt_pin: "HORQCLIP", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M20013", seccion: "16", img_pin: "641M20013", txt_pin: "PIN MACHO 16MM2 HAN TC 70A", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0853", img_pos: "09 99 000 0853", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M20014", seccion: "16", img_pin: "641M20014", txt_pin: "PIN HEMBRA 16MM2 HAN TC 70A", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0853", img_pos: "09 99 000 0853", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M20038", seccion: "2,5", img_pin: "641M20038", txt_pin: "PIN HEMBRA REF.27963-22 T112 ITT CANON", txt_pela: "STRIPAX 9005000000", txt_longitud: "10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "", img_ext: ""},
   {id: "641M20039", seccion: "2,5", img_pin: "641M20039", txt_pin: "PIN MACHO REF.27913-22 T112 ITT CANNON", txt_pela: "STRIPAX 9005000000", txt_longitud: "10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 20", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "", img_ext: ""},
   {id: "641M239", seccion: "4", img_pin: "641M239", txt_pin: "M PLAT HC", txt_pela: "STRIPAX 9005000000", txt_longitud: "9,6", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "4", img_regul: "NUEVA HARTING 09 99 000 0377 4", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M240", seccion: "4", img_pin: "641M240", txt_pin: "H PLAT HC", txt_pela: "STRIPAX 9005000000", txt_longitud: "9,6", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "4", img_regul: "NUEVA HARTING 09 99 000 0377 4", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M283", seccion: "1,5", img_pin: "641M283", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M287", seccion: "1", img_pin: "641M287", txt_pin: "M PLAT V9", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M287", seccion: "2", img_pin: "641M287", txt_pin: "M PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M288", seccion: "2,5", img_pin: "641M288", txt_pin: "M PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M321", seccion: "2", img_pin: "641M321", txt_pin: "H PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M322", seccion: "4", img_pin: "641M322", txt_pin: "M4", txt_pela: "STRIPAX 9005000000", txt_longitud: "8,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M322", seccion: "6", img_pin: "641M322", txt_pin: "M4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8,5", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "AMP 59239-4", img_tenaza: "AMP 59239-4", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M337", seccion: "0,5", img_pin: "641M337", txt_pin: "M PLAT HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M338", seccion: "2", img_pin: "641M338", txt_pin: "M PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M367", seccion: "16", img_pin: "641M367", txt_pin: "M", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "CUNA HEXAGONAL Nº3", img_pos: "N3", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M368", seccion: "16", img_pin: "641M368", txt_pin: "H", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "CUNA HEXAGONAL Nº3", img_pos: "N3", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M369", seccion: "25", img_pin: "641M369", txt_pin: "M", txt_pela: "9001540000", txt_longitud: "12", img_pela: "9001540000", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "CUNA HEXAGONAL Nº5", img_pos: "N5", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M370", seccion: "25", img_pin: "641M370", txt_pin: "H", txt_pela: "9001540000", txt_longitud: "12", img_pela: "9001540000", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "CUNA HEXAGONAL Nº5", img_pos: "N5", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M382", seccion: "22", img_pin: "641M382", txt_pin: "M", txt_pela: "", txt_longitud: "12", img_pela: "", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M384", seccion: "22", img_pin: "641M384", txt_pin: "H", txt_pela: "", txt_longitud: "12", img_pela: "", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M390", seccion: "2,5", img_pin: "641M390", txt_pin: "M PLAT HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M391", seccion: "2,5", img_pin: "641M391", txt_pin: "H PLAT HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M464", seccion: "6", img_pin: "641M464", txt_pin: "M PLAT HC", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "9,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "6", img_regul: "NUEVA HARTING 09 99 000 0377 6", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M466", seccion: "1", img_pin: "641M466", txt_pin: "H DOR HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M467", seccion: "1,5", img_pin: "641M467", txt_pin: "H DOR HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M476", seccion: "0,5", img_pin: "641M476", txt_pin: "H PLAT HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M488", seccion: "6", img_pin: "641M488", txt_pin: "H PLAT HC", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "9,5", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "NUEVA HARTING 09 99 000 0377", img_tenaza: "NUEVA HARTING 09 99 000 0377", txt_pos: "NUEVA HARTING 09 99 000 0377", img_pos: "NUEVA HARTING 09 99 000 0377", txt_matriz: "6", img_regul: "NUEVA HARTING 09 99 000 0377 6", txt_ext: "HARTING 09 99 000 0305", img_ext: "HARTING 09 99 000 0305"},
   {id: "641M516", seccion: "3", img_pin: "641M516", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M517", seccion: "3", img_pin: "641M517", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M518", seccion: "2", img_pin: "641M518", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M519", seccion: "2", img_pin: "641M519", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M525", seccion: "0,5", img_pin: "641M525", txt_pin: "M DOR V12", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M527", seccion: "0,5", img_pin: "641M527", txt_pin: "H DOR V12", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M529", seccion: "2,5", img_pin: "641M529", txt_pin: "M DOR HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M530", seccion: "2,5", img_pin: "641M530", txt_pin: "H DOR HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M531", seccion: "1", img_pin: "641M531", txt_pin: "M DOR HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M532", seccion: "1,5", img_pin: "641M532", txt_pin: "M DOR HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M533", seccion: "1,5", img_pin: "641M533", txt_pin: "H DOR HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M534", seccion: "2,5", img_pin: "641M534", txt_pin: "M DOR HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M535", seccion: "2,5", img_pin: "641M535", txt_pin: "H DOR HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M539", seccion: "0,5", img_pin: "641M539", txt_pin: "PIN M", txt_pela: "STRIPAX-1", txt_longitud: "3,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ITT CANON 121586-5236", img_tenaza: "ITT CANON 121586-5236", txt_pos: "ITT CANON 121586-5236", img_pos: "ITT CANON 121586-5236", txt_matriz: "0,5", img_regul: "ITT CANON 121586-5236 0,5", txt_ext: "", img_ext: ""},
   {id: "641M540", seccion: "0,5", img_pin: "641M540", txt_pin: "PIN H", txt_pela: "STRIPAX-1", txt_longitud: "3,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ITT CANON 121586-5236", img_tenaza: "ITT CANON 121586-5236", txt_pos: "ITT CANON 121586-5236", img_pos: "ITT CANON 121586-5236", txt_matriz: "0,5", img_regul: "ITT CANON 121586-5236 0,5", txt_ext: "", img_ext: ""},
   {id: "641M541", seccion: "1", img_pin: "641M541", txt_pin: "CONTACT H", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "", img_ext: ""},
   {id: "641M541", seccion: "1,5", img_pin: "641M541", txt_pin: "CONTACT H", txt_pela: "STRIPAX 9005000000", txt_longitud: "4", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "", img_ext: ""},
   {id: "641M546", seccion: "4", img_pin: "641M546", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M547", seccion: "4", img_pin: "641M547", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M561", seccion: "3", img_pin: "641M561", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M562", seccion: "3", img_pin: "641M562", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M563", seccion: "2", img_pin: "641M563", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M564", seccion: "2", img_pin: "641M564", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M574", seccion: "1,5", img_pin: "641M574", txt_pin: "M DOR HD", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "114-728", img_ext: "114-728"},
   {id: "641M576", seccion: "0,5", img_pin: "641M576", txt_pin: "M DOR HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M577", seccion: "0,5", img_pin: "641M577", txt_pin: "H DOR HD", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 10", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M578", seccion: "22", img_pin: "641M578", txt_pin: "M", txt_pela: "", txt_longitud: "12", img_pela: "", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M579", seccion: "22", img_pin: "641M579", txt_pin: "H", txt_pela: "", txt_longitud: "12", img_pela: "", img_obs: "", txt_tenaza: "CEMBRE HT 45", img_tenaza: "CEMBRE HT 45", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M594", seccion: "1,5", img_pin: "641M594", txt_pin: "M PLAT HC", txt_pela: "STRIPAX 9005000000", txt_longitud: "9,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 9", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "843-0320", img_ext: "843-0320"},
   {id: "641M595", seccion: "1", img_pin: "641M595", txt_pin: "H DOR HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M600", seccion: "1", img_pin: "641M600", txt_pin: "M DOR HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M613", seccion: "2,5", img_pin: "641M613", txt_pin: "M PLAT HC", txt_pela: "STRIPAX 9005000000", txt_longitud: "9,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 9", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "843-0320", img_ext: "843-0320"},
   {id: "641M614", seccion: "1,5", img_pin: "641M614", txt_pin: "H PLAT HC", txt_pela: "STRIPAX 9005000000", txt_longitud: "9,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 9", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "843-0320", img_ext: "843-0320"},
   {id: "641M615", seccion: "2,5", img_pin: "641M615", txt_pin: "H PLAT HC", txt_pela: "STRIPAX 9005000000", txt_longitud: "9,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 9", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,8", img_regul: "ASTRO TOOL CORP. 621205 1,8", txt_ext: "843-0320", img_ext: "843-0320"},
   {id: "641M644", seccion: "0,5", img_pin: "641M644", txt_pin: "M DOR HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M645", seccion: "0,5", img_pin: "641M645", txt_pin: "H DOR HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "843-6615", img_ext: "843-6615"},
   {id: "641M646", seccion: "4", img_pin: "641M646", txt_pin: "M DOR HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "2", img_regul: "ASTRO TOOL CORP. 621205 2", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M647", seccion: "4", img_pin: "641M647", txt_pin: "H DOR HE", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "2", img_regul: "ASTRO TOOL CORP. 621205 2", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M648", seccion: "1,5", img_pin: "641M648", txt_pin: "PIN H DELPHI", txt_pela: "STRIPAX 9005000000", txt_longitud: "5,6", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "HT31012451-1", img_tenaza: "HT31012451-1", txt_pos: "HT31012451-1", img_pos: "HT31012451-1", txt_matriz: "1,5", img_regul: "HT31012451-1 1,5", txt_ext: "DMC DRK 289", img_ext: "DMC DRK 289"},
   {id: "641M649", seccion: "1,5", img_pin: "641M649", txt_pin: "PIN M DELPHI", txt_pela: "STRIPAX 9005000000", txt_longitud: "5,6", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "HT31012451-1", img_tenaza: "HT31012451-1", txt_pos: "HT31012451-1", img_pos: "HT31012451-1", txt_matriz: "1,5", img_regul: "HT31012451-1 1,5", txt_ext: "DMC DRK 289", img_ext: "DMC DRK 289"},
   {id: "641M654", seccion: "0,6", img_pin: "641M654", txt_pin: "M DOR V12", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M655", seccion: "0,6", img_pin: "641M655", txt_pin: "H DOR V12", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M656", seccion: "2,5", img_pin: "641M656", txt_pin: "M DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M657", seccion: "2,5", img_pin: "641M657", txt_pin: "M PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M684", seccion: "2,5", img_pin: "641M684", txt_pin: "H PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M687", seccion: "1", img_pin: "641M687", txt_pin: "H PLAT V9", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M687", seccion: "2", img_pin: "641M687", txt_pin: "H PLAT V9", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M717", seccion: "1,5", img_pin: "641M717", txt_pin: "CONTACTO HEMBRA 350550-6", txt_pela: "STRIPAX 9005000000", txt_longitud: "4", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 91500-1", img_tenaza: "AMP 91500-1", txt_pos: "AMP 91500-1", img_pos: "AMP 91500-1", txt_matriz: "16-14", img_regul: "AMP 91500-1 [16-14]", txt_ext: "1804030-1", img_ext: "1804030-1"},
   {id: "641M760", seccion: "0,5", img_pin: "641M760", txt_pin: "TERMINAL ACODADO", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M760", seccion: "1", img_pin: "641M760", txt_pin: "TERMINAL ACODADO", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M760", seccion: "1,5", img_pin: "641M760", txt_pin: "TERMINAL ACODADO", txt_pela: "STRIPAX 9005000000", txt_longitud: "5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "AMP 47386", img_tenaza: "AMP 47386", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M824", seccion: "0,75", img_pin: "641M824", txt_pin: "H DOR HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M875", seccion: "0,5", img_pin: "641M875", txt_pin: "M P/CONECTOR SUB-D", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA MH800", img_tenaza: "TENAZA MH800", txt_pos: "09990000531", img_pos: "09990000531", txt_matriz: "6", img_regul: "MH800 6", txt_ext: "HARTING 09 99 000 0171", img_ext: "HARTING 09 99 000 0171"},
   {id: "641M876", seccion: "0,5", img_pin: "641M876", txt_pin: "H P/CONECTOR SUB-D", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA MH800", img_tenaza: "TENAZA MH800", txt_pos: "09990000531", img_pos: "09990000531", txt_matriz: "6", img_regul: "MH800 6", txt_ext: "HARTING 09 99 000 0171", img_ext: "HARTING 09 99 000 0171"},
   {id: "641M879", seccion: "1", img_pin: "641M879", txt_pin: "PIN MACHO 0,6-1,82 MM2 S1", txt_pela: "STRIPAX-1", txt_longitud: "9", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TP900-1", img_pos: "TP900-1", txt_matriz: "18", img_regul: "DMC AF8 18", txt_ext: "", img_ext: ""},
   {id: "641M879", seccion: "1,5", img_pin: "641M879", txt_pin: "PIN MACHO 0,6-1,82 MM2 S1", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TP900-1", img_pos: "TP900-1", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "", img_ext: ""},
   {id: "641M880", seccion: "1,5", img_pin: "641M880", txt_pin: "PIN MACHO 1,5-2,61 MM2 S1", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TP900-1", img_pos: "TP900-1", txt_matriz: "16", img_regul: "DMC AF8 16", txt_ext: "", img_ext: ""},
   {id: "641M880", seccion: "2,5", img_pin: "641M880", txt_pin: "PIN MACHO 1,5-2,61 MM2 S1", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC AF8", img_tenaza: "DMC AF8", txt_pos: "TP900-1", img_pos: "TP900-1", txt_matriz: "14", img_regul: "DMC AF8 14", txt_ext: "", img_ext: ""},
   {id: "641M929", seccion: "0,5", img_pin: "641M929", txt_pin: "PIN HEMBRA PACKARD", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 6", txt_tenaza: "DELPHI PACKARD 12039500", img_tenaza: "DELPHI PACKARD 12039500", txt_pos: "DELPHI PACKARD 12039500", img_pos: "DELPHI PACKARD 12039500", txt_matriz: "0,35-0,5", img_regul: "DELPHI PACKARD 12039500 0,35-0,5", txt_ext: "KN-APP90088", img_ext: "KN-APP90088"},
   {id: "641M929", seccion: "1", img_pin: "641M929", txt_pin: "PIN HEMBRA PACKARD", txt_pela: "STRIPAX-1", txt_longitud: "4", img_pela: "STRIPAX-1", img_obs: "Ayuda 6", txt_tenaza: "DELPHI PACKARD 12039500", img_tenaza: "DELPHI PACKARD 12039500", txt_pos: "DELPHI PACKARD 12039500", img_pos: "DELPHI PACKARD 12039500", txt_matriz: "0,8-1", img_regul: "DELPHI PACKARD 12039500 0,8-1,0", txt_ext: "KN-APP90088", img_ext: "KN-APP90088"},
   {id: "641M936", seccion: "0,5", img_pin: "641M936", txt_pin: "M SUB-D AWG20-24", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA MH800", img_tenaza: "TENAZA MH800", txt_pos: "09990000531", img_pos: "09990000531", txt_matriz: "6", img_regul: "MH800 6", txt_ext: "HARTING 09 99 000 0171", img_ext: "HARTING 09 99 000 0171"},
   {id: "641M937", seccion: "0,5", img_pin: "641M937", txt_pin: "H (SUB-D AWG20- 24)", txt_pela: "STRIPAX-1", txt_longitud: "5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA MH800", img_tenaza: "TENAZA MH800", txt_pos: "09990000531", img_pos: "09990000531", txt_matriz: "6", img_regul: "MH800 6", txt_ext: "HARTING 09 99 000 0171", img_ext: "HARTING 09 99 000 0171"},
   {id: "641M948", seccion: "0,75", img_pin: "641M948", txt_pin: "M DOR HE", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 11", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "1,55", img_regul: "ASTRO TOOL CORP. 621205 1,55", txt_ext: "313-6613", img_ext: "313-6613"},
   {id: "641M987", seccion: "0,5", img_pin: "641M987", txt_pin: "H PLAT V9", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M988", seccion: "2,5", img_pin: "641M988", txt_pin: "H DOR V12", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,25", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M989", seccion: "0,5", img_pin: "641M989", txt_pin: "M PLAT V9", txt_pela: "STRIPAX-1", txt_longitud: "7,25", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "ASTRO TOOL CORP. 621205", img_tenaza: "ASTRO TOOL CORP. 621205", txt_pos: "ASTRO TOOL CORP. 621205", img_pos: "ASTRO TOOL CORP. 621205", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "645951", seccion: "1", img_pin: "645951", txt_pin: "CONTACT M (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "18-16", img_regul: "AMP 58495-1 18-16", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "AU632415", seccion: "0,5", img_pin: "AU632415", txt_pin: "632415 - socket deutsch 0462-201-1631", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA HDT-48-00", img_tenaza: "TENAZA HDT-48-00", txt_pos: "TENAZA HDT-48-00", img_pos: "TENAZA HDT-48-00", txt_matriz: "0,5/20", img_regul: "TENAZA HDT-48-00 0,5", txt_ext: "", img_ext: ""},
   {id: "AU632415", seccion: "1", img_pin: "AU632415", txt_pin: "632415 - socket deutsch 0462-201-1631", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA HDT-48-00", img_tenaza: "TENAZA HDT-48-00", txt_pos: "TENAZA HDT-48-00", img_pos: "TENAZA HDT-48-00", txt_matriz: "1,0/16", img_regul: "TENAZA HDT-48-00 1", txt_ext: "", img_ext: ""},
   {id: "AU632416", seccion: "0,5", img_pin: "AU632416", txt_pin: "PIN DEUTSCH 0460-202-1631", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA HDT-48-00", img_tenaza: "TENAZA HDT-48-00", txt_pos: "TENAZA HDT-48-00", img_pos: "TENAZA HDT-48-00", txt_matriz: "0,5/20", img_regul: "TENAZA HDT-48-00 0,5", txt_ext: "", img_ext: ""},
   {id: "AU632416", seccion: "1", img_pin: "AU632416", txt_pin: "PIN DEUTSCH 0460-202-1631", txt_pela: "STRIPAX-1", txt_longitud: "7", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "TENAZA HDT-48-00", img_tenaza: "TENAZA HDT-48-00", txt_pos: "TENAZA HDT-48-00", img_pos: "TENAZA HDT-48-00", txt_matriz: "1,0/16", img_regul: "TENAZA HDT-48-00 1", txt_ext: "", img_ext: ""},
   {id: "AU6381019", seccion: "10", img_pin: "AU6381019", txt_pin: "HARTING PIN Han TC100", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "19", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0852", img_pos: "09 99 000 0852", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "AU638174", seccion: "16", img_pin: "AU638174", txt_pin: "CABLE SHOE (XCT 16) AMP-TYCO", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "16", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 70-16 CU", img_pos: "4 E 70-16 CU", txt_matriz: "16", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0005257", seccion: "25", img_pin: "H0005257", txt_pin: "PIN 25MM2 HAN TC100", txt_pela: "9001540000", txt_longitud: "15", img_pela: "9001540000", img_obs: "Ayuda 13", txt_tenaza: "AMP SIMABLOC 55", img_tenaza: "AMP SIMABLOC 55", txt_pos: "4 E 95-25 CU", img_pos: "", txt_matriz: "25", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0014654", seccion: "0,5", img_pin: "H0014654", txt_pin: "PIN HEMBRA 10-40556- 12G117 GLENAIR", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "20", img_regul: "DMC FT8 20", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0014659", seccion: "2,5", img_pin: "H0014659", txt_pin: "PIN HEMBRA 10-40556- 20G117 GLENAIR", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0014661", seccion: "2,5", img_pin: "H0014661", txt_pin: "PIN HEMBRA 10-40556- 26G117 GLENAIR", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0014666", seccion: "0,5", img_pin: "H0014666", txt_pin: "PIN MACHO 10- 40557-12G117 GLENAIR", txt_pela: "STRIPAX-1", txt_longitud: "7,5", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "AZUL", txt_matriz: "20", img_regul: "DMC FT8 20", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0014670", seccion: "2,5", img_pin: "H0014670", txt_pin: "PIN MACHO 10- 40557-20G10 GLENAIR", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "AZUL", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0014673", seccion: "1,5", img_pin: "H0014673", txt_pin: "PIN MACHO 10- 40557G117 GLENAIR", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "AZUL", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0014679", seccion: "6", img_pin: "H0014679", txt_pin: "PIN MACHO 10- 40561-38G10 GLENAIR", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "10", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 2", txt_tenaza: "M317", img_tenaza: "M317", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "4", img_regul: "M317 4", txt_ext: "", img_ext: ""},
   {id: "H0014681", seccion: "10", img_pin: "H0014681", txt_pin: "PIN HEMBRA 10-40793-1G10 GLENAIR", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "14", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "CEMBRE HT131-C", img_tenaza: "CEMBRE HT131-C", txt_pos: "VG95236T11AB001", img_pos: "VG95236T11AB001", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0015633", seccion: "1,5", img_pin: "H0015633", txt_pin: "PIN HEMBRA 10-40556G117 GLENAIR", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0023422", seccion: "2,5", img_pin: "H0023422", txt_pin: "PIN MACHO 10- 40557-26G117 GLENAIR", txt_pela: "STRIPAX 9005000000", txt_longitud: "7,5", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "VH435", img_pos: "AZUL", txt_matriz: "14", img_regul: "DMC FT8 14", txt_ext: "M.118250", img_ext: "M.118250"},
   {id: "H0072147", seccion: "1,5", img_pin: "H0072147", txt_pin: "Terminal Receptacle AMP 282110-1", txt_pela: "STRIPAX 9005000000", txt_longitud: "3,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "TENAZA AMP: 354940-1", img_tenaza: "TENAZA AMP 354940-1", txt_pos: "58583-2", img_pos: "58583-2", txt_matriz: "1,5", img_regul: "58583-2 1,5", txt_ext: "AMP 6-1579007-1 B", img_ext: "AMP 6-1579007-1 B"},
   {id: "H0073214", seccion: "0,5", img_pin: "H0073214", txt_pin: "Terminal Socket Tyco 965907-5", txt_pela: "STRIPAX-1", txt_longitud: "3,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "TENAZA AMP: 539635-1", img_tenaza: "TENAZA AMP 539635-1", txt_pos: "5-1579001-1", img_pos: "5-1579001-1", txt_matriz: "0,5", img_regul: "5-1579001-1 0,5", txt_ext: "AMP 9-1579007-1 A", img_ext: "AMP 9-1579007-1 A"},
   {id: "H0073214", seccion: "1", img_pin: "H0073214", txt_pin: "Terminal Socket Tyco 965907-5", txt_pela: "STRIPAX-1", txt_longitud: "3,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "TENAZA AMP: 539635-1", img_tenaza: "TENAZA AMP 539635-1", txt_pos: "5-1579001-1", img_pos: "5-1579001-1", txt_matriz: "0,75", img_regul: "5-1579001-1 0,75", txt_ext: "AMP 9-1579007-1 A", img_ext: "AMP 9-1579007-1 A"},
   {id: "H0076892", seccion: "16", img_pin: "H0076892", txt_pin: "PUNTERA AZUL", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15-16", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 19", txt_tenaza: "WEIDMÜLLER PZ 16", img_tenaza: "WEIDMULLER PZ 16", txt_pos: "WEIDMÜLLER PZ 16", img_pos: "WEIDMULLER PZ 16", txt_matriz: "16", img_regul: "WEIDMULLER PZ 16 16", txt_ext: "", img_ext: ""},
   {id: "H0079913", seccion: "10", img_pin: "H0079913", txt_pin: "PUNTERA ROJA", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "15-16", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 19", txt_tenaza: "WEIDMÜLLER PZ 16", img_tenaza: "WEIDMULLER PZ 16", txt_pos: "WEIDMÜLLER PZ 16", img_pos: "WEIDMULLER PZ 16", txt_matriz: "10", img_regul: "WEIDMULLER PZ 16 10", txt_ext: "", img_ext: ""},
   {id: "H0124832", seccion: "4", img_pin: "H0124832", txt_pin: "AMARILLO-NEGRO HORQUILLA", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", img_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0124832", seccion: "6", img_pin: "H0124832", txt_pin: "AMARILLO-NEGRO HORQUILLA", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", img_tenaza: "MECATRACTION TH3-2 (AISLANTE GRUESO)", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0136577", seccion: "0,5", img_pin: "H0136577", txt_pin: "MALE, PIN CONTACTS 015 076 1- 20- OG", txt_pela: "STRIPAX-1", txt_longitud: "8", img_pela: "STRIPAX-1", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "20", img_regul: "DMC FT8 20", txt_ext: "HYPERTAC S051", img_ext: "HYPERTAC S051"},
   {id: "H0136577", seccion: "1,5", img_pin: "H0136577", txt_pin: "MALE, PIN CONTACTS 015 076 1- 20- OG", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "ROJO", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "HYPERTAC S051", img_ext: "HYPERTAC S051"},
   {id: "H0136578", seccion: "1,5", img_pin: "H0136578", txt_pin: "MALE, PIN CONTACTS 025 020 1- 23 -OG", txt_pela: "STRIPAX 9005000000", txt_longitud: "9", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "DMC FT8", img_tenaza: "DMC FT8", txt_pos: "SH463", img_pos: "AZUL", txt_matriz: "16", img_regul: "DMC FT8 16", txt_ext: "HYPERTAC SE0250000001", img_ext: "HYPERTAC SE0250000001"},
   {id: "H0157272", seccion: "", img_pin: "H0157272", txt_pin: "END CAP, CIERRE", txt_pela: "", txt_longitud: "NO APLICA (SOLO PROTECCIÓN)", img_pela: "", img_obs: "", txt_tenaza: "JST WCE-2210", img_tenaza: "JST WCE-2210", txt_pos: "JST WCE-2210", img_pos: "JST WCE-2210", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0184830", seccion: "0,5", img_pin: "H0184830", txt_pin: "KK 254 CRIMP PIN FEM AWG22-28", txt_pela: "STRIPAX-1", txt_longitud: "3", img_pela: "STRIPAX-1", img_obs: "Ayuda 21", txt_tenaza: "MOLEX 638118200", img_tenaza: "MOLEX 638118200", txt_pos: "MOLEX 638118200", img_pos: "MOLEX 638118200", txt_matriz: "22-24", img_regul: "", txt_ext: "11030022", img_ext: "11030022"},
   {id: "H0219074", seccion: "2,5", img_pin: "H0219074", txt_pin: "HDC-C-HD-SM2.5AU", txt_pela: "STRIPAX 9005000000", txt_longitud: "7", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 2", txt_tenaza: "WEIDMÜLLER CTX CM 1.6/2.5", img_tenaza: "WEIDMULLER CTX CM", txt_pos: "WEIDMÜLLER CTX CM 1.6/2.5", img_pos: "WEIDMULLER CTX CM", txt_matriz: "2,5", img_regul: "WEIDMULLER CTX CM 2,5", txt_ext: "1866730000", img_ext: "1866730000"},
   {id: "H0219075", seccion: "1", img_pin: "H0219075", txt_pin: "HDC-C-HD-SM0.75-1.00AU", txt_pela: "STRIPAX-1", txt_longitud: "9", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "WEIDMÜLLER CTX CM 1.6/2.5", img_tenaza: "WEIDMULLER CTX CM", txt_pos: "WEIDMÜLLER CTX CM 1.6/2.5", img_pos: "WEIDMULLER CTX CM", txt_matriz: "0,75-1", img_regul: "WEIDMULLER CTX CM 1", txt_ext: "1866730000", img_ext: "1866730000"},
   {id: "H0219174", seccion: "10", img_pin: "H0219174", txt_pin: "TUBULAR M4", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "MECATRACTION PMM 1", img_tenaza: "MECATRACTION PMM 1", txt_pos: "H1-10-35F", img_pos: "H1-10-35F", txt_matriz: "10", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0256028", seccion: "4", img_pin: "H0256028", txt_pin: "M5 (estrecho)", txt_pela: "STRIPAX 9005000000", txt_longitud: "8", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0256028", seccion: "6", img_pin: "H0256028", txt_pin: "M5 (estrecho)", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "8", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 1", txt_tenaza: "MECATRACTION TH3", img_tenaza: "MECATRACTION TH3", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0295811", seccion: "35", img_pin: "H0295811", txt_pin: "Han TC250 Male contact 35mm²", txt_pela: "9001540000", txt_longitud: "22", img_pela: "9001540000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0855", img_pos: "09 99 000 0855", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0316022", seccion: "10", img_pin: "H0316022", txt_pin: "Han 1 HC250- Female 10 ... 70 mm²", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "22", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0852", img_pos: "09 99 000 0852", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0316022", seccion: "16", img_pin: "H0316022", txt_pin: "Han 1 HC250- Female 10 ... 70 mm²", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "22", img_pela: "STRIPAX-16 9005610000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0853", img_pos: "09 99 000 0853", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0316024", seccion: "35", img_pin: "H0316024", txt_pin: "Han TC250 Female contact 35mm²", txt_pela: "9001540000", txt_longitud: "22", img_pela: "9001540000", img_obs: "", txt_tenaza: "TENAZA KLAUKE HK", img_tenaza: "TENAZA KLAUKE HK", txt_pos: "09 99 000 0855", img_pos: "09 99 000 0855", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337641", seccion: "0,5", img_pin: "H0337641", txt_pin: "Sin aislamiento (puntera blanca) 641H10055", txt_pela: "STRIPAX-1", txt_longitud: "10", img_pela: "STRIPAX-1", img_obs: "Ayuda 18", txt_tenaza: "WEIDMÜLLER PZ 10 HEX", img_tenaza: "WEIDMULLER PZ 10 HEX", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337645", seccion: "1", img_pin: "H0337645", txt_pin: "Sin aislamiento (puntera roja) 641H10056", txt_pela: "STRIPAX-1", txt_longitud: "10", img_pela: "STRIPAX-1", img_obs: "Ayuda 18", txt_tenaza: "WEIDMÜLLER PZ 10 HEX", img_tenaza: "WEIDMULLER PZ 10 HEX", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337648", seccion: "1,5", img_pin: "H0337648", txt_pin: "Sin aislamiento (puntera negra) 641H10057", txt_pela: "STRIPAX 9005000000", txt_longitud: "10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 18", txt_tenaza: "WEIDMÜLLER PZ 10 HEX", img_tenaza: "WEIDMULLER PZ 10 HEX", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337649", seccion: "2,5", img_pin: "H0337649", txt_pin: "Sin aislamiento (puntera azul) 641H10058", txt_pela: "STRIPAX 9005000000", txt_longitud: "10", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 18", txt_tenaza: "WEIDMÜLLER PZ 10 HEX", img_tenaza: "WEIDMULLER PZ 10 HEX", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337650", seccion: "4", img_pin: "H0337650", txt_pin: "Sin aislamiento (puntera gris) 641H10053", txt_pela: "STRIPAX 9005000000", txt_longitud: "12", img_pela: "STRIPAX 9005000000", img_obs: "Ayuda 18", txt_tenaza: "WEIDMÜLLER PZ 10 HEX", img_tenaza: "WEIDMULLER PZ 10 HEX", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337652", seccion: "6", img_pin: "H0337652", txt_pin: "Sin aislamiento (puntera amarilla) 641H10054", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 18", txt_tenaza: "WEIDMÜLLER PZ 10 HEX", img_tenaza: "WEIDMULLER PZ 10 HEX", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337653", seccion: "10", img_pin: "H0337653", txt_pin: "Sin aislamiento (puntera roja) H0079913", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "12", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 3", txt_tenaza: "WEIDMÜLLER PZ 16", img_tenaza: "WEIDMULLER PZ 16", txt_pos: "WEIDMÜLLER PZ 16", img_pos: "WEIDMULLER PZ 16", txt_matriz: "10", img_regul: "WEIDMULLER PZ 16 10", txt_ext: "", img_ext: ""},
   {id: "H0337654", seccion: "0,25", img_pin: "H0337654", txt_pin: "PRESION M5", txt_pela: "STRIPAX-1", txt_longitud: "4,5", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337654", seccion: "0,5", img_pin: "H0337654", txt_pin: "PRESION M5", txt_pela: "STRIPAX-1", txt_longitud: "4,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337654", seccion: "1", img_pin: "H0337654", txt_pin: "PRESION M5", txt_pela: "STRIPAX-1", txt_longitud: "4,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337654", seccion: "1,5", img_pin: "H0337654", txt_pin: "PRESION M5", txt_pela: "STRIPAX 9005000000", txt_longitud: "4,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337655", seccion: "0,25", img_pin: "H0337655", txt_pin: "PRESION M2.5", txt_pela: "STRIPAX-1", txt_longitud: "4,5", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337655", seccion: "0,5", img_pin: "H0337655", txt_pin: "PRESION M2.5", txt_pela: "STRIPAX-1", txt_longitud: "4,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337655", seccion: "1", img_pin: "H0337655", txt_pin: "PRESION M2.5", txt_pela: "STRIPAX-1", txt_longitud: "4,5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0337655", seccion: "1,5", img_pin: "H0337655", txt_pin: "PRESION M2.5", txt_pela: "STRIPAX 9005000000", txt_longitud: "4,5", img_pela: "STRIPAX 9005000000", img_obs: "", txt_tenaza: "AMP 58546-1", img_tenaza: "AMP 58546-1", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0340091", seccion: "16", img_pin: "H0340091", txt_pin: "Sin aislamiento (puntera azul)", txt_pela: "STRIPAX-16 9005610000", txt_longitud: "18", img_pela: "STRIPAX-16 9005610000", img_obs: "Ayuda 3", txt_tenaza: "WEIDMÜLLER PZ 16", img_tenaza: "WEIDMULLER PZ 16", txt_pos: "WEIDMÜLLER PZ 16", img_pos: "WEIDMULLER PZ 16", txt_matriz: "16", img_regul: "WEIDMULLER PZ 16 16", txt_ext: "", img_ext: ""},
   {id: "H0360912", seccion: "0,25", img_pin: "H0360912", txt_pin: "CONTACTO MACHO DORADO 0,2-0.8 350690-2", txt_pela: "STRIPAX-1", txt_longitud: "4,5-5", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 91510-1", img_tenaza: "AMP 91510-1", txt_pos: "AMP 91510-1", img_pos: "AMP 91510-1", txt_matriz: "24-22", img_regul: "AMP 91510-1 24-22", txt_ext: "1804030-1", img_ext: "1804030-1"},
   {id: "H0360912", seccion: "0,5", img_pin: "H0360912", txt_pin: "CONTACTO MACHO DORADO 0,2-0.8 350690-2", txt_pela: "STRIPAX-1", txt_longitud: "4,5-5", img_pela: "STRIPAX-1", img_obs: "", txt_tenaza: "AMP 91510-1", img_tenaza: "AMP 91510-1", txt_pos: "AMP 91510-1", img_pos: "AMP 91510-1", txt_matriz: "20-18", img_regul: "AMP 91510-1 20-18", txt_ext: "1804030-1", img_ext: "1804030-1"},
   {id: "H0712760", seccion: "0,14", img_pin: "H0712760", txt_pin: "CONTACT M (AMP)", txt_pela: "STRIPAX-1", txt_longitud: "3,6-4,3", img_pela: "9003700000", img_obs: "", txt_tenaza: "AMP 58495-1", img_tenaza: "AMP 58495-1", txt_pos: "58495-2", img_pos: "58495-2", txt_matriz: "28-24", img_regul: "AMP 58495-1 28-24", txt_ext: "162-5723", img_ext: "162-5723"},
   {id: "641M10067", seccion: "", img_pin: "641M10067", txt_pin: "MANGUITO CRIMPAR CABLE 61030000050", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10058", seccion: "", img_pin: "641M10058", txt_pin: "MANGUITO CRIMPAR CABLE 61030000055", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10303", seccion: "", img_pin: "641M10303", txt_pin: "MANGUITO CRIMPAR CABLE 61030000049", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0229783", seccion: "", img_pin: "H0229783", txt_pin: "MANGUITO CRIMPAR CABLE 61030000051", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M940", seccion: "", img_pin: "641M940", txt_pin: "MANGUITO CRIMPAR CABLE 61030000053", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0545633", seccion: "", img_pin: "H0545633", txt_pin: "MANGUITO CRIMPAR CABLE 61030000054", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10057", seccion: "", img_pin: "641M10057", txt_pin: "BRIDA CRIMPAR CABLE 61030000067", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10070", seccion: "", img_pin: "641M10070", txt_pin: "BRIDA CRIMPAR CABLE 61030000064 HARTING", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10068", seccion: "", img_pin: "641M10068", txt_pin: "BRIDA CRIMPAR CABLE CF100 4/5 FAB. INOTEC SUB-D", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "H0229784", seccion: "", img_pin: "H0229784", txt_pin: "BRIDA CRIMPAR CABLE 61 03 000 0066 (5-6)", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
   {id: "641M10066", seccion: "", img_pin: "641M10066", txt_pin: "BRIDA CRIMPAR CABLE 61 03 000 0063 (3,5- 4,5)", txt_pela: "", txt_longitud: "0", img_pela: "", img_obs: "", txt_tenaza: "HARTING 61036000020 CS12 MAXI", img_tenaza: "HARTING 61036000020 CS12 MAXI", txt_pos: "", img_pos: "", txt_matriz: "", img_regul: "", txt_ext: "", img_ext: ""},
       ];
 
       // Rutas de carpetas configuradas
       const CRIMP_PATHS = {
           terminales: 'Terminales/',
           posicionadores: 'Posicionadores/',
           pelacables: 'Pelacables/',
           crimpadoras: 'Crimpadoras/',
           regulacion: 'Regulacion/',
           extractores: 'Extractores/',
           ayuda: 'Ayuda/'
       };
 
       var i18n = {
           es: { descMang: "Desc. manguito", descTermDe: "Desc. terminal de", descTermPara: "Desc. terminal para", landingSubtitle: "INFORME DE CABLEADO GENERAL INTERACTIVO", waitingData: "Esperando datos...", locator: "Localizador", views: "Vistas", connList: "Lista Conexiones", cableSum: "Resumen Cables", termList: "Lista de terminales / pines", sleeveList: "Lista de Manguitos", matElem: "Materiales", instruction: "Pulsa el automático para conectar", customCols: "Personalizar Columnas", placeholderElement: "F5...", placeholderWire: "Referencia...", noItems: "No hay elementos para mostrar" },
           en: { descMang: "Sleeve Desc.", descTermDe: "From Term. Desc.", descTermPara: "To Term. Desc.", landingSubtitle: "INTERACTIVE GENERAL WIRING REPORT", waitingData: "Waiting for data...", locator: "Locator", views: "Views", connList: "Connection List", cableSum: "Cable Summary", termList: "Lista de Terminales", sleeveList: "Lista de Manguitos", matElem: "Materials", itemsLoaded: "records loaded", instruction: "Push breaker to connect", customCols: "Customize Columns", placeholderElement: "F5...", placeholderWire: "Reference...", noItems: "No items to display" }
       };
 
       function isKN(c) {
           if (!c) return false;
           const v = c.toString().toUpperCase();
           return v.includes('KN-PELAR') || v.includes('PELADO') || v.startsWith('KN-');
       }
 
       function copyAndOpenWindchill(planoText) {
           if (!planoText || planoText === '---') return;
           const el = document.createElement('textarea');
           el.value = planoText + '*';
           document.body.appendChild(el);
           el.select();
           document.execCommand('copy');
           document.body.removeChild(el);
           window.open('https://windchill01.corp.knorr-bremse.com/Windchill/app/', '_blank');
       }
 
        let currentSortCol = null, sortAsc = true;
       let rawData = [], reportMetadata = {}, masterMap = { cables: {}, terminals: {}, sleeves: {} };
       let currentView = 'table', filterText = '', filterMarcaText = '', selectedMaterial = null, currentLang = 'es';
       let summaryViewMode = 'cards'; 
       let currentZoom = 1, panX = 0, panY = 0, isPanning = false, resizingCol = null, startX, startWidth, thDragIdx = null, baseViewBox = { x: 0, y: 0, w: 0, h: 0 };
       let lastTouchX = 0, lastTouchY = 0, lastTouchDist = 0; 
       let detailPinSequence = [], detailPinDataMap = new Map(), currentDetailIndex = 0;
       let progressMap = {};
       let errorsMap = {};
       let incidenciaModeActive = false;
       let currentSummaryStats = {};
 
       let columns = [
           { id: 'STATUS', key: 'status', visible: true, width: 45, es: 'OK', en: 'OK' },
           { id: 'A', key: 'posicion', visible: true, width: 60, es: 'POS.', en: 'POS.' },
           { id: 'B', key: 'orden', visible: true, width: 70, es: 'ORDEN', en: 'ORDER' },
           { id: 'C', key: 'cod_cable', visible: true, width: 120, es: 'ID CABLE', en: 'WIRE ID' },
           { id: 'D', key: 'seccion', visible: true, width: 70, es: 'SECC.', en: 'SECT.' },
           { id: 'E', key: 'longitud', visible: true, width: 80, es: 'LONGITUD', en: 'LENGTH' },
           { id: 'F', key: 'marcado', visible: true, width: 90, es: 'MARCADO', en: 'MARKED' },
           { id: 'G', key: 'cable_marca', visible: true, width: 130, es: 'MARCA', en: 'LABEL' },
           { id: 'H', key: 'de_elemento', visible: true, width: 100, es: 'DE ELEM.', en: 'FROM ELEM.' },
           { id: 'I', key: 'de_punto', visible: true, width: 80, es: 'DE PUNTO', en: 'FROM POINT' },
           { id: 'J', key: 'de_terminal', visible: true, width: 100, es: 'DE TERMINAL', en: 'FROM TERM.' },
           { id: 'K', key: 'de_manguito', visible: true, width: 100, es: 'DE MANGUITO', en: 'FROM SLEEVE' },
           { id: 'M', key: 'para_elemento', visible: true, width: 100, es: 'PARA ELEM.', en: 'TO ELEM.' },
           { id: 'N', key: 'para_punto', visible: true, width: 80, es: 'PARA PUNTO', en: 'TO POINT' },
           { id: 'O', key: 'para_terminal', visible: true, width: 100, es: 'PARA TERMINAL', en: 'TO TERM.' },
           { id: 'P', key: 'observaciones', visible: true, width: 150, es: 'OBSERVACIONES', en: 'REMARKS' },
           { id: 'X', key: 'desc_cable', visible: false, width: 200, es: 'DESCRIPCIÓN CABLE', en: 'WIRE DESC' },
           { id: 'Y', key: 'desc_manguito', visible: false, width: 180, es: 'DESC. MANGUITO', en: 'SLEEVE DESC' },
           { id: 'Z', key: 'desc_terminal_de', visible: false, width: 180, es: 'DESC. TERM. DE', en: 'FROM TERM DESC' },
           { id: 'AA', key: 'desc_terminal_para', visible: false, width: 180, es: 'DESC. TERM. PARA', en: 'TO TERM DESC' }
       ];
 
       function getStorageKey() {
           const equipo = reportMetadata.equipo || 'default';
           return `ICGVision_Progress_${equipo.replace(/\s+/g, '_')}`;
       }
       function saveProgress() { try { localStorage.setItem(getStorageKey(), JSON.stringify(progressMap)); } catch (e) { console.error("Error saving progress", e); } }
       function loadProgress() { try { const stored = localStorage.getItem(getStorageKey()); progressMap = stored ? JSON.parse(stored) : {}; } catch (e) { progressMap = {}; } }
       function saveErrors() { try { localStorage.setItem(getStorageKey() + '_errors', JSON.stringify(errorsMap)); } catch (e) { console.error("Error saving errors", e); } }
       function loadErrors() { try { const stored = localStorage.getItem(getStorageKey() + '_errors'); errorsMap = stored ? JSON.parse(stored) : {}; } catch (e) { errorsMap = {}; } }

       // ── ADMINISTRADOR: carpeta de autoguardado (IndexedDB para persistir el DirectoryHandle) ──
     const _IDB_NAME = 'ICGVisionAdmin';
     const _IDB_STORE = 'handles';
     const _SAVE_DIR_NAME_KEY = 'ICGVision_SaveDirName';
     let _saveDirHandle = null;     // DirectoryHandle activo con permiso concedido (solo http/https)
     let _saveDirName = localStorage.getItem(_SAVE_DIR_NAME_KEY) || '';
     let _permWarned = false;       // Reservado para avisos de autoguardado

       function _openAdminDB() {
           return new Promise((resolve, reject) => {
               const req = indexedDB.open(_IDB_NAME, 1);
               req.onupgradeneeded = e => e.target.result.createObjectStore(_IDB_STORE);
               req.onsuccess = e => resolve(e.target.result);
               req.onerror = () => reject(req.error);
           });
       }

       async function _loadDirHandle() {
           try {
               const db = await _openAdminDB();
               return new Promise(resolve => {
                   const tx = db.transaction(_IDB_STORE, 'readonly');
                   const req = tx.objectStore(_IDB_STORE).get('saveDir');
                   req.onsuccess = () => resolve(req.result || null);
                   req.onerror = () => resolve(null);
               });
           } catch { return null; }
       }

       async function _storeDirHandle(handle) {
           try {
               const db = await _openAdminDB();
               return new Promise((resolve, reject) => {
                   const tx = db.transaction(_IDB_STORE, 'readwrite');
                   tx.objectStore(_IDB_STORE).put(handle, 'saveDir');
                   tx.oncomplete = resolve;
                   tx.onerror = () => reject(tx.error);
               });
           } catch (e) { console.error('Error guardando handle en IDB', e); }
       }

       async function _clearDirHandle() {
           try {
               const db = await _openAdminDB();
               return new Promise(resolve => {
                   const tx = db.transaction(_IDB_STORE, 'readwrite');
                   tx.objectStore(_IDB_STORE).delete('saveDir');
                   tx.oncomplete = resolve;
               });
           } catch { /* silencioso */ }
       }

       // Escribe el JSON completo (formateado) en la carpeta indicada con el nombre del equipo.
       async function _writeJsonToDir(dirHandle, data) {
           const fileName = `ICG_${(data.equipo || 'default').replace(/[^a-zA-Z0-9]/g, '_')}.json`;
           const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
           const writable = await fileHandle.createWritable();
           await writable.write(JSON.stringify(data, null, 2));
           await writable.close();
           return fileName;
       }

       // ── Carpeta de guardado configurada por el Administrador ────────────────────────
       // _saveDirHandle guarda la carpeta elegida. Se usa como punto de partida (startIn)
       // del diálogo de guardado para que el explorador se abra directamente en ella.

       function _updateAdminUI() {
           const label     = document.getElementById('adminSaveFolderLabel');
           const clearBtn  = document.getElementById('btnClearSaveFolder');
           const btnLabel  = document.getElementById('btnSelectFolderLabel');
           const selectBtn = document.getElementById('btnSelectFolder');
           const hint      = document.getElementById('adminFolderHint');
           if (!label) return;
           label.classList.remove('text-sap-secondaryText', 'text-sap-blue', 'text-amber-500', 'font-bold');

           const configuredFolderName = _saveDirHandle?.name || _saveDirName;

           if (configuredFolderName) {
               label.textContent = configuredFolderName;
               label.classList.add('text-sap-blue', 'font-bold');
               if (clearBtn) clearBtn.classList.remove('hidden');
               if (selectBtn) selectBtn.classList.remove('hidden');
               if (btnLabel) btnLabel.textContent = 'Cambiar carpeta';
               if (hint) hint.textContent = _isLocalFilePage()
                   ? 'Al guardar, el explorador intentará abrirse en esta carpeta. Si el navegador bloquea la escritura local, se usará Descargas como respaldo.'
                   : 'Al guardar, el explorador se abrirá directamente en esta carpeta. El usuario solo confirma.';
           } else {
               label.textContent = 'Sin configurar';
               label.classList.add('text-sap-secondaryText');
               if (clearBtn) clearBtn.classList.add('hidden');
               if (selectBtn) selectBtn.classList.remove('hidden');
               if (btnLabel) btnLabel.textContent = 'Configurar carpeta de guardado';
               if (hint) hint.textContent = 'Elige la carpeta donde se guardarán los archivos. Quedará memorizada para futuros guardados.';
           }
       }

       async function adminSelectSaveFolder() {
           if (!window.showDirectoryPicker) {
               showNotification('Tu navegador no soporta selección de carpeta. Usa Chrome o Edge.', 'error');
               return;
           }
           // En file:// Chrome no concede permiso de escritura sobre la carpeta y el
           // selector rechaza si se pide { mode: 'readwrite' }. Pedimos solo lectura: es
           // suficiente para mostrar el nombre y para usarla como punto de partida
           // (startIn) del diálogo de guardado. La escritura real ya tiene su respaldo.
           let handle;
           try {
               handle = await window.showDirectoryPicker();
           } catch (e) {
               if (e.name === 'AbortError') return; // el usuario canceló: sin aviso
               showNotification(`No se pudo seleccionar la carpeta: ${e.name}`, 'error');
               return;
           }
           _saveDirHandle = handle;
           _saveDirName = handle.name;
           localStorage.setItem(_SAVE_DIR_NAME_KEY, _saveDirName);
           _permWarned = false;
           _updateAdminUI();
           await _storeDirHandle(handle);
           showNotification(`Carpeta configurada: ${handle.name}`, 'success');
       }

       async function adminClearSaveFolder() {
           _saveDirHandle = null;
           _saveDirName = '';
           localStorage.removeItem(_SAVE_DIR_NAME_KEY);
           _permWarned = false;
           await _clearDirHandle();
           _updateAdminUI();
           showNotification('Carpeta de guardado eliminada', 'success');
       }

       async function _initAdminDirHandle() {
           try {
               const dirHandle = await _loadDirHandle();
               // Conservamos el handle para mostrar su nombre y usarlo como punto de
               // partida del diálogo de guardado, aunque el permiso deba reconcederse.
               if (dirHandle && !_saveDirHandle) {
                   _saveDirHandle = dirHandle;
                   _saveDirName = dirHandle.name || _saveDirName;
                   if (_saveDirName) localStorage.setItem(_SAVE_DIR_NAME_KEY, _saveDirName);
               }
           } catch (e) {
               console.error('No se pudo cargar la configuración de carpeta', e);
           }
           _updateAdminUI();
       }

       // Asegura permiso de escritura sobre la carpeta configurada DENTRO de un gesto del
       // usuario. Devuelve true si la carpeta queda lista para abrirse en el diálogo.
       async function _ensureDirPermission() {
           if (!_saveDirHandle) return false;
           try {
               let perm = await _saveDirHandle.queryPermission({ mode: 'readwrite' });
               if (perm !== 'granted') {
                   perm = await _saveDirHandle.requestPermission({ mode: 'readwrite' });
               }
               return perm === 'granted';
           } catch {
               return false;
           }
       }

       // ── PANEL ADMINISTRADOR (acceso protegido) ──
       const ADMIN_PASSWORD = 'IFA';

       function openAdminPanel() {
           // Cerrar el dropdown de ajustes
           const dd = document.getElementById('settingsDropdown');
           if (dd) dd.classList.add('hidden');
           // Resetear a estado de login (se pide contraseña cada vez)
           const modal = document.getElementById('adminModal');
           const loginStep = document.getElementById('adminLoginStep');
           const optionsStep = document.getElementById('adminOptionsStep');
           const pwInput = document.getElementById('adminPasswordInput');
           const pwError = document.getElementById('adminPasswordError');
           if (loginStep) loginStep.classList.remove('hidden');
           if (optionsStep) optionsStep.classList.add('hidden');
           if (pwError) pwError.classList.add('hidden');
           if (pwInput) pwInput.value = '';
           if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
           if (window.lucide) lucide.createIcons();
           setTimeout(() => pwInput && pwInput.focus(), 50);
       }

       function closeAdminPanel() {
           const modal = document.getElementById('adminModal');
           if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
       }

       async function adminCheckPassword() {
           const pwInput = document.getElementById('adminPasswordInput');
           const pwError = document.getElementById('adminPasswordError');
           if (!pwInput) return;
           if (pwInput.value === ADMIN_PASSWORD) {
               document.getElementById('adminLoginStep').classList.add('hidden');
               document.getElementById('adminOptionsStep').classList.remove('hidden');
               if (pwError) pwError.classList.add('hidden');
               if (window.lucide) lucide.createIcons();
               _updateAdminUI();
           } else {
               if (pwError) pwError.classList.remove('hidden');
               pwInput.value = '';
               pwInput.focus();
           }
       }
       // ── FIN PANEL ADMINISTRADOR ──
       
       function clearAllProgress() {
           if (!window.confirm('¿Seguro que quieres reiniciar el progreso?\nEsta acción no se puede deshacer.')) return;
           progressMap = {}; saveProgress(); hasUnsavedChanges = false; updateSaveButton(); updateGlobalProgress(); updateView(); toggleSettings();
           const toast = document.getElementById('notificationToast');
           if (toast) {
               const span = toast.querySelector('span'); if (span) span.innerText = "Progreso del equipo reiniciado correctamente";
               toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000);
           }
       }
       // Función auxiliar para comprobar si un cable está terminado al 100%
       function isCableFinished(pos, elName = null) {
   const prog = progressMap[pos];
   if (!prog) return false;
   
   // Si no pasamos elemento, devolvemos el estado global (mantiene compatibilidad)
   if (!elName) return prog.de === true && prog.para === true;
   
   // Buscamos la fila para saber si el elemento es 'de' o 'para'
   const row = rawData.find(r => r.posicion === pos);
   if (!row) return false;
   
   const s = elName.toLowerCase();
   const esOrigen = (row.de_elemento || '').toLowerCase() === s;
   const esDestino = (row.para_elemento || '').toLowerCase() === s;
   
   // Si el elemento es ambos (puente), necesita ambos extremos marcados
   if (esOrigen && esDestino) return prog.de === true && prog.para === true;
   // Si solo es uno, basta con el estado de ese lado
   return esOrigen ? prog.de === true : (esDestino ? prog.para === true : false);
}
 
       // Nueva lógica de guardado: detecta automáticamente qué lado marcar
function toggleProgress(pos, contextElement = null) {
   if (!progressMap[pos]) progressMap[pos] = { de: false, para: false };
   
   if (contextElement) {
       const row = rawData.find(r => r.posicion === pos);
       if (!row) return;
       
       const s = contextElement.toLowerCase();
       // Cambia el estado (true/false) del extremo local de forma dinámica
       if ((row.de_elemento || '').toLowerCase() === s) progressMap[pos].de = !progressMap[pos].de;
       if ((row.para_elemento || '').toLowerCase() === s) progressMap[pos].para = !progressMap[pos].para;
   }
   
   saveProgress();
   registerChange();
   updateGlobalProgress();
   renderTable();
   
   // Si estamos dentro del asistente Modo Visión, forzamos el refresco inmediato de todo el panel
   if (!document.getElementById('detailModal').classList.contains('hidden')) {
       renderDetailStep();
       renderProgressList(); // Reevalúa asimétricamente los ticks verdes laterales
   }
   
   const graphModal = document.getElementById('graphModal');
   if (!graphModal.classList.contains('hidden')) {
       drawDiagram(document.getElementById('graphElementName').innerText);
   }
}
 
       function updateGlobalProgress() {
    if (!rawData || rawData.length === 0) return;

    // Cada cable físico representa 2 tareas de conexionado independientes (Origen y Destino)
    const totalConnections = rawData.length * 2;
    let completedConnections = 0;

    // Contabilizamos de forma independiente cada extremo realizado en el mapa de progreso
    rawData.forEach(r => {
        const prog = progressMap[r.posicion];
        if (prog) {
            if (prog.de === true) completedConnections++;
            if (prog.para === true) completedConnections++;
        }
    });

    // Cálculo del porcentaje basado en conexiones individuales reales
    const percent = totalConnections > 0 ? Math.round((completedConnections / totalConnections) * 100) : 0;

    // Actualización de elementos en la interfaz de usuario (UI)
    const progressBar = document.getElementById('globalProgressFill');
    const progressText = document.getElementById('globalProgressText');

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) {
        progressText.innerText = `${completedConnections} de ${totalConnections} conexiones realizadas (${percent}%)`;
    }
}
       
       function updateErrorBadge() {
           const count = Object.keys(errorsMap).length;
           ['errorBadge', 'errorBadgeVision'].forEach(id => {
               const badge = document.getElementById(id);
               if (!badge) return;
               if (count > 0) { badge.textContent = count > 9 ? '9+' : count; badge.classList.remove('hidden'); }
               else { badge.classList.add('hidden'); }
           });
       }
 
       function toggleIncidenciasMenu() {
           const dd = document.getElementById('incidenciasDropdown');
           const btn = document.getElementById('btnIncidencias');
           const isOpen = !dd.classList.contains('hidden');
           dd.classList.toggle('hidden', isOpen);
           btn.classList.toggle('bg-red-500/10', !isOpen);
       }
 
       function toggleVisionIncidenciasMenu() {
           const dd = document.getElementById('visionIncidenciasDropdown');
           const btn = document.getElementById('btnVisionIncidencias');
           const isOpen = !dd.classList.contains('hidden');
           dd.classList.toggle('hidden', isOpen);
           btn.classList.toggle('bg-red-500/80', !isOpen);
       }
 
       function openIncidentFromVision() {
           toggleVisionIncidenciasMenu();
           if (!detailPinSequence || detailPinSequence.length === 0) {
               showNotification('No hay ningún punto seleccionado', 'error'); return;
           }
           const pin = detailPinSequence[currentDetailIndex];
           const connections = detailPinDataMap.get(pin);
           if (!connections || connections.length === 0) {
               showNotification('No hay cables en el punto activo', 'error'); return;
           }
           if (connections.length === 1) {
               openErrorModal(connections[0].posicion);
               return;
           }
           // Más de un cable: mostrar selector
           const list = document.getElementById('visionCableSelectList');
           list.innerHTML = connections.map(c => {
               const hasError = errorsMap[c.posicion] !== undefined;
               return `<button onclick="closeVisionCableSelect(); openErrorModal('${c.posicion}')"
                   class="w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left
                       ${hasError
                           ? 'border-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100'
                           : 'border-sap-border dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-sap-blue/5'}">
                   <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                       ${hasError ? 'bg-red-100 dark:bg-red-900/40 text-red-500' : 'bg-sap-blue/10 text-sap-blue'}">
                       <i class="fas ${hasError ? 'fa-exclamation-triangle' : 'fa-plug'} text-xs"></i>
                   </div>
                   <div class="min-w-0">
                       <p class="text-sm font-bold text-sap-text dark:text-white truncate">${c.cable_marca || c.posicion}</p>
                       <p class="text-xs text-slate-500 dark:text-slate-400 truncate">Pos: ${c.posicion} · ${c.cod_cable || '—'}</p>
                   </div>
                   ${hasError ? '<span class="ml-auto text-[9px] font-bold text-red-500 uppercase">Con incidencia</span>' : ''}
               </button>`;
           }).join('');
           const modal = document.getElementById('visionCableSelectModal');
           modal.classList.remove('hidden');
           modal.classList.add('flex');
           if (window.lucide) lucide.createIcons();
       }
 
       function closeVisionCableSelect() {
           const modal = document.getElementById('visionCableSelectModal');
           modal.classList.add('hidden');
           modal.classList.remove('flex');
       }
 
       function activateIncidenciaMode() {
           incidenciaModeActive = true;
           const bar = document.getElementById('incidenciaModeBar');
           if (bar) { bar.classList.remove('hidden'); bar.classList.add('flex'); }
           toggleIncidenciasMenu();
           renderTable();
       }
 
       function deactivateIncidenciaMode() {
           incidenciaModeActive = false;
           const bar = document.getElementById('incidenciaModeBar');
           if (bar) { bar.classList.add('hidden'); bar.classList.remove('flex'); }
           renderTable();
       }
 
       // ── GESTIÓN DE ERRORES ─────────────────────────────────────────────────
       const ERROR_COLUMNS = [
           { key: 'posicion',         label: 'A — Posición' },
           { key: 'orden',            label: 'B — Orden dentro de la lista' },
           { key: 'cod_cable',        label: 'C — Cod. cable' },
           { key: 'seccion',          label: 'D — Sección' },
           { key: 'longitud',         label: 'E — Longitud' },
           { key: 'marcado',          label: 'F — Marcado' },
           { key: 'cable_marca',      label: 'G — Cable / Marca' },
           { key: 'de_elemento',      label: 'H — De Elemento' },
           { key: 'de_punto',         label: 'I — De Punto Conexión' },
           { key: 'de_terminal',      label: 'J — De Terminal' },
           { key: 'de_manguito',      label: 'K — De Manguito' },
           { key: 'para_manguito',    label: 'L — De Marca' },
           { key: 'para_elemento',    label: 'M — Para Elemento' },
           { key: 'para_punto',       label: 'N — Para Punto Conexión' },
           { key: 'para_terminal',    label: 'O — Para Terminal' },
           { key: 'observaciones',    label: 'P — Observaciones' }
       ];
 
       let _errorModalPosicion = null;
 
       function openErrorModal(posicion) {
           _errorModalPosicion = posicion;
           const row = rawData.find(r => r.posicion === posicion);
           if (!row) return;
           const existing = errorsMap[posicion] || {};
           document.getElementById('errorModalPosicion').textContent = posicion;
           const deleteBtn = document.getElementById('errorDeleteBtn');
           const saveBtn = document.querySelector('#errorModal button[onclick="saveError()"]');
           if (Object.keys(existing).length > 0) deleteBtn.classList.remove('hidden');
           else deleteBtn.classList.add('hidden');
           if (saveBtn) saveBtn.classList.remove('hidden');
           const fields = document.getElementById('errorModalFields');
           fields.innerHTML = ERROR_COLUMNS.map(col => {
               const original = row[col.key] || '';
               const changed = existing[col.key] !== undefined ? existing[col.key] : original;
               const isModified = existing[col.key] !== undefined;
               const isPosicion = col.key === 'posicion';
               return `<div class="flex flex-col gap-1">
                   <label class="text-xs font-semibold text-slate-500 dark:text-slate-400">${col.label}</label>
                   <div class="text-xs text-slate-400 dark:text-slate-500 mb-1">Original: <span class="font-mono">${original || '—'}</span></div>
                   <input type="text"
                       data-key="${col.key}"
                       value="${changed}"
                       placeholder="${original || '—'}"
                       ${isPosicion ? 'readonly' : ''}
                       class="w-full px-3 py-2 rounded-lg border text-xs font-mono transition-colors
                           ${isModified
                               ? 'border-red-400 bg-red-50 dark:bg-red-500/30 text-red-700 dark:text-red-300'
                               : 'border-sap-border dark:border-slate-600 bg-white dark:bg-slate-700 text-sap-text dark:text-slate-200'}
                           ${isPosicion ? 'bg-slate-100 dark:bg-slate-700 cursor-not-allowed' : ''}
                           focus:outline-none focus:ring-2 focus:ring-sap-blue/40"
                       oninput="highlightIfChanged(this, '${original}')">
               </div>`;
           }).join('');
           const modal = document.getElementById('errorModal');
           modal.classList.remove('hidden');
           modal.classList.add('flex');
       }
 
       function highlightIfChanged(input, original) {
           const changed = input.value !== original;
           input.classList.toggle('border-red-400', changed);
           input.classList.toggle('bg-red-50', changed);
           input.classList.toggle('dark:bg-red-500/30', changed);
           input.classList.toggle('text-red-700', changed);
           input.classList.toggle('border-sap-border', !changed);
           input.classList.toggle('bg-white', !changed);
       }
 
       function closeErrorModal() {
           _errorModalPosicion = null;
           const modal = document.getElementById('errorModal');
           modal.classList.add('hidden');
           modal.classList.remove('flex');
       }
 
       function saveError() {
           if (!_errorModalPosicion) return;
           const row = rawData.find(r => r.posicion === _errorModalPosicion);
           if (!row) return;
           const inputs = document.querySelectorAll('#errorModalFields input[data-key]');
           const changes = {};
           inputs.forEach(input => {
               const key = input.dataset.key;
               // Normalizamos a texto para evitar falsos cambios por tipo (number vs string).
               const original = String(row[key] ?? '');
               const current = String(input.value ?? '');
               if (current !== original) changes[key] = input.value;
           });
           if (Object.keys(changes).length === 0) {
               delete errorsMap[_errorModalPosicion];
           } else {
               errorsMap[_errorModalPosicion] = { ...changes };
           }
           saveErrors();
           registerChange();
           closeErrorModal();
           renderTable();
           updateErrorBadge();
           const msg = Object.keys(changes).length === 0
               ? 'Incidencia eliminada'
               : 'Incidencia registrada correctamente';
           showNotification(msg, 'success');
       }
 
       function deleteError() {
           if (!_errorModalPosicion) return;
           delete errorsMap[_errorModalPosicion];
           saveErrors();
           registerChange();
           closeErrorModal();
           renderTable();
           updateErrorBadge();
           showNotification('Registro de error eliminado', 'success');
       }
       // ── FIN GESTIÓN DE ERRORES ─────────────────────────────────────────────
 
       function exportSummaryToExcel() {
           if (!currentSummaryStats || Object.keys(currentSummaryStats).length === 0) return;
           const dataToExport = Object.entries(currentSummaryStats).map(([ref, val]) => ({ 'Código': ref, 'Descripción': val.desc || '---', 'Cantidad': val.count }));
           const wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(dataToExport); XLSX.utils.book_append_sheet(wb, ws, "Resumen");
           const typeLabel = currentView.split('-')[1] || 'Materiales', teamName = (reportMetadata.equipo || 'Export').replace(/\s+/g, '_');
           XLSX.writeFile(wb, `Resumen_${typeLabel}_${teamName}.xlsx`);
       }
 
       function exportErrorReport() {
           if (!rawData || rawData.length === 0) { showNotification('No hay datos cargados', 'error'); return; }
 
           const COL_KEYS = ['posicion','orden','cod_cable','seccion','longitud','marcado','cable_marca',
                             'de_elemento','de_punto','de_terminal','de_manguito','para_manguito',
                             'para_elemento','para_punto','para_terminal','observaciones','estado'];
           const COL_HEADERS = ['Posición','Orden dentro de la lista','Cod. cable','Sección','Longitud',
                                'Marcado','Cable / Marca','De Elemento','De Punto Conexión','De Terminal',
                                'De Manguito','De Marca','Para Elemento','Para Punto Conexión','Para Terminal','Observaciones','Estado'];
           const RED = { font: { color: { rgb: 'FF0000' }, bold: true } };
           const HEADER_STYLE = { font: { bold: true }, fill: { fgColor: { rgb: 'D9E1F2' } }, alignment: { horizontal: 'center' } };
           const ADDED_STYLE = { fill: { fgColor: { rgb: 'C6EFCE' } } };
           const DELETED_STYLE = { fill: { fgColor: { rgb: 'FFC7CE' } } };
           const MODIFIED_STYLE = { fill: { fgColor: { rgb: 'FFEB9C' } } };
           const ORDER_CHANGED_STYLE = { fill: { fgColor: { rgb: 'FFEB9C' } }, font: { color: { rgb: '9C6500' }, bold: true } };
 
           const allRows = rawData;
           const changedRows = allRows.filter(row => {
               const changes = errorsMap[row.posicion] || {};
               return row.deleted || row.added || row.orderChanged || Object.keys(changes).length > 0;
           });
           const wb = XLSX.utils.book_new();
           const wsData = [COL_HEADERS.map(h => ({ v: h, s: HEADER_STYLE }))];
 
           allRows.forEach(row => {
               const changes = errorsMap[row.posicion] || {};
               const hasError = Object.keys(changes).length > 0;
               const state = row.deleted ? 'Eliminado' : row.added ? 'Añadido' : row.orderChanged ? 'Renumerado' : row.modificado ? 'Modificado' : (hasError ? 'Con incidencia' : 'Sin cambios');
               const rowStyle = row.deleted ? DELETED_STYLE : row.added ? ADDED_STYLE : null;
               const cells = COL_KEYS.map(key => {
                   if (key === 'estado') {
                       return { v: state, s: rowStyle ? { ...rowStyle, font: { bold: true } } : { font: { bold: true } } };
                   }
                   const isChanged = changes[key] !== undefined;
                   const value = isChanged ? changes[key] : (row[key] || '');
                   const style = {};
                   if (rowStyle) Object.assign(style, rowStyle);
                   if (key === 'orden' && row.orderChanged) Object.assign(style, ORDER_CHANGED_STYLE);
                   if (row.deleted && key !== 'estado') Object.assign(style, DELETED_STYLE);
                   if (row.added && key !== 'estado') Object.assign(style, ADDED_STYLE);
                   if (isChanged) Object.assign(style, MODIFIED_STYLE, RED);
                   return Object.keys(style).length ? { v: value, s: style } : { v: value };
               });
               wsData.push(cells);
           });
 
           const ws = XLSX.utils.aoa_to_sheet(wsData);
           ws['!cols'] = COL_KEYS.map((_, i) => ({ wch: i === 0 ? 12 : i === 1 ? 20 : 16 }));
           XLSX.utils.book_append_sheet(wb, ws, 'Informe de Errores');
           const teamName = (reportMetadata.equipo || 'Export').replace(/\s+/g, '_');
           XLSX.writeFile(wb, `Informe_Errores_${teamName}.xlsx`);
           showNotification(`Informe exportado con ${allRows.length} filas y ${changedRows.length} cambios/incidencias registrados`, 'success');
       }

       function updateSaveButton() {
    const btn = document.getElementById('btnSave');
    if (!btn) return;
    const icon = btn.querySelector('i');
    const svg = btn.querySelector('svg'); // Capturamos el SVG real generado por Lucide
    
    if (hasUnsavedChanges) {
        btn.disabled = false;
        // Activado: Removemos estados inactivos
        btn.classList.remove('cursor-not-allowed', 'opacity-40');
        // Activado: Añadimos feedback visual verde al botón
        btn.classList.add('hover:bg-emerald-500/10', 'text-emerald-500', 'dark:text-emerald-400');
        btn.title = 'GUARDAR CAMBIOS';
        
        if (icon) {
            icon.classList.remove('text-slate-400', 'dark:text-slate-500');
            icon.classList.add('text-emerald-500', 'dark:text-emerald-400');
        }
        if (svg) {
            // Forzamos el color verde directamente en los atributos del gráfico vectorial (SVG)
            svg.classList.remove('text-slate-400', 'dark:text-slate-500');
            svg.classList.add('text-emerald-500', 'dark:text-emerald-400');
            svg.setAttribute('stroke', '#10b981'); 
            svg.style.stroke = '#10b981';
        }
    } else {
        btn.disabled = true;
        // Desactivado: Reintroducimos estados inactivos y gris de origen
        btn.classList.add('cursor-not-allowed', 'opacity-40');
        btn.classList.remove('hover:bg-emerald-500/10', 'text-emerald-500', 'dark:text-emerald-400');
        btn.title = 'GUARDAR CAMBIOS (No hay cambios pendientes)';
        
        if (icon) {
            icon.classList.remove('text-emerald-500', 'dark:text-emerald-400');
            icon.classList.add('text-slate-400', 'dark:text-slate-500');
        }
        if (svg) {
            // Devolvemos el SVG a su color gris neutro original de la interfaz de SAP
            svg.classList.remove('text-emerald-500', 'dark:text-emerald-400');
            svg.classList.add('text-slate-400', 'dark:text-slate-500');
            svg.setAttribute('stroke', '#94a3b8');
            svg.style.stroke = '#94a3b8';
        }
    }
}
	   function loadDataFromFile() {
    const input = document.getElementById('jsonLoadInput');
    if (!input) return;

    input.value = '';

    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const data = JSON.parse(ev.target.result);

                // Validar estructura mínima
                if (!data.equipo || !data.progress) {
                    const toast = document.getElementById('notificationToast');
                    const span = toast.querySelector('span');
                    if (span) span.innerText = 'Archivo no válido o corrupto';
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3500);
                    input.value = '';
                    return;
                }

                // Validar coincidencia de equipo
                if (data.equipo !== reportMetadata.equipo) {
                    const continuar = window.confirm(
                        `⚠️ El archivo pertenece al equipo "${data.equipo}" pero tienes cargado "${reportMetadata.equipo}".\n\n¿Deseas cargar el progreso igualmente?`
                    );
                    if (!continuar) {
                        input.value = '';
                        return;
                    }
                }

                // Restaurar datos
                progressMap = data.progress || {};
                errorsMap = data.errors || {};

                // Persistir en localStorage
                saveProgress();
                saveErrors();

       if (Array.isArray(data.rows)) {
           rawData = data.rows;
       } else if (Array.isArray(data.rawData)) {
           rawData = data.rawData;
       }
 
                renderTable();

                hasUnsavedChanges = false;
				updateSaveButton();
                input.value = '';

                // Notificación de éxito
                const fecha = data.fechaExportacion
                    ? new Date(data.fechaExportacion).toLocaleString('es-ES')
                    : '---';
                const toast = document.getElementById('notificationToast');
                const span = toast.querySelector('span');
                if (span) span.innerText = `Progreso restaurado correctamente (guardado el ${fecha})`;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3500);

            } catch (err) {
                console.error('Error leyendo JSON:', err);
                const toast = document.getElementById('notificationToast');
                const span = toast.querySelector('span');
                if (span) span.innerText = 'Error al leer el archivo';
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3500);
                input.value = '';
            }
        };
        reader.readAsText(file);
    };

    input.click();
}
function showNotification(msg, type) {
    const toast = document.getElementById('notificationToast');
    if (!toast) return;
    const span = toast.querySelector('span');
    if (span) span.innerText = msg;
    toast.classList.remove('toast-success', 'toast-error', 'toast-warning');
    if (type === 'error') toast.classList.add('toast-error');
    else if (type === 'warning') toast.classList.add('toast-warning');
    else toast.classList.add('toast-success');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), type === 'warning' ? 5000 : 3500);
}
function _markSaved() {
    hasUnsavedChanges = false;
    _autoSaveCount = 0;
    _permWarned = false;
    _startAutoSaveTimer();
    updateSaveButton();
}

// Descarga silenciosa sin ningún diálogo (el navegador guarda en la carpeta de descargas).
function _downloadJson(data) {
    const fileName = `ICG_${(data.equipo || 'default').replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fileName;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function _isLocalFilePage() {
    return window.location && window.location.protocol === 'file:';
}

function _isFileSystemWriteBlocked(error) {
    return error && (error.name === 'NotAllowedError' || error.name === 'SecurityError');
}

function _finishWithDownloadFallback(data) {
    _downloadJson(data);
    _markSaved();
    showNotification('Archivo descargado en la carpeta de descargas del navegador ✓', 'success');
}

async function saveDataToFile() {
   try {
       if (!reportMetadata || !reportMetadata.equipo) {
           showNotification('No hay equipo cargado', 'error');
           return;
       }

       // Copia de seguridad interna siempre, antes de intentar escribir en disco.
       _writeLocalBackup();

       const data = _buildSaveData();
       const json = JSON.stringify(data, null, 2);
       const fileName = `ICG_${reportMetadata.equipo.replace(/[^a-zA-Z0-9]/g, '_')}.json`;

       // ── Diálogo de guardado abierto en la carpeta configurada por el Administrador ───
       if (window.showSaveFilePicker) {
           const opts = {
               suggestedName: fileName,
               types: [{ description: 'Archivo JSON', accept: { 'application/json': ['.json'] } }]
           };
           // El explorador se abre en la carpeta configurada (startIn solo necesita el
           // handle, no permiso). En file:// la escritura está bloqueada y se resuelve con
           // el respaldo de descarga; en http/localhost exigimos permiso para createWritable.
           if (_saveDirHandle) {
               if (_isLocalFilePage() || await _ensureDirPermission()) {
                   opts.startIn = _saveDirHandle;
               }
           }

           let fileHandle;
           try {
               fileHandle = await window.showSaveFilePicker(opts);
           } catch (e) {
               // El usuario pulsó "Cancelar": NO se ha guardado nada. Botón sigue activo.
               if (e.name === 'AbortError') {
                   showNotification('Guardado CANCELADO. Los cambios siguen pendientes ⚠️', 'warning');
                   return;
               }
               throw e;
           }

           // El usuario confirmó: escribimos realmente el archivo.
           try {
               const writable = await fileHandle.createWritable();
               await writable.write(json);
               await writable.close();
           } catch (e) {
               console.error('Error al escribir el archivo:', e);
               if (_isFileSystemWriteBlocked(e)) {
                   _finishWithDownloadFallback(data);
                   return;
               }
               showNotification('No se pudo escribir el archivo. Los cambios siguen pendientes ⚠️', 'error');
               return;
           }

           _markSaved();
           showNotification('Datos guardados correctamente ✓', 'success');
           return;
       }

       // ── Fallback (navegadores sin File System Access API) ───────────────────────────
       _finishWithDownloadFallback(data);

   } catch (e) {
       console.error('Error guardando archivo:', e);
       showNotification('Error al guardar archivo. Los cambios siguen pendientes ⚠️', 'error');
   }
}

function getNextPosicion() {
    if (!rawData || rawData.length === 0) return '1';
    const numbers = rawData.map(r => parseInt(r.posicion, 10)).filter(n => !isNaN(n));
    return String(numbers.length ? Math.max(...numbers) + 1 : 1);
}

function openAddCableModal() {
    const modal = document.getElementById('cableCrudModal');
    if (!modal) return;
    document.getElementById('crudModalTitle').innerText = 'Añadir Cable Nuevo';
    document.getElementById('crudPosicion').value = getNextPosicion();
    document.getElementById('crudOrden').value = '';
    document.getElementById('crudCodCable').value = '';
    document.getElementById('crudSeccion').value = '';
    document.getElementById('crudLongitud').value = '';
    document.getElementById('crudMarcado').value = '';
    document.getElementById('crudCableMarca').value = '';
    document.getElementById('crudDeElemento').value = '';
    document.getElementById('crudDePunto').value = '';
    document.getElementById('crudDeTerminal').value = '';
    document.getElementById('crudDeManguito').value = '';
    document.getElementById('crudParaElemento').value = '';
    document.getElementById('crudParaPunto').value = '';
    document.getElementById('crudParaTerminal').value = '';
    document.getElementById('crudParaManguito').value = '';
    document.getElementById('crudObservaciones').value = '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCableModal() {
    const modal = document.getElementById('cableCrudModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function shiftOrdersDown(startOrder) {
    for (let i = rawData.length - 1; i >= 0; i -= 1) {
        const row = rawData[i];
        const currentOrder = parseInt(row.orden, 10);
        if (!isNaN(currentOrder) && currentOrder >= startOrder) {
            row.orden = String(currentOrder + 1);
            row.modificado = true;
        }
    }
}

function normalizeOrdenes() {
    if (!rawData || rawData.length === 0) return;
    rawData.sort((a, b) => {
        const aNum = parseInt(a.orden, 10);
        const bNum = parseInt(b.orden, 10);
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        if (!isNaN(aNum)) return -1;
        if (!isNaN(bNum)) return 1;
        return String(a.posicion).localeCompare(String(b.posicion), undefined, { numeric: true });
    });
    rawData.forEach((row, index) => {
        const targetOrder = String(index + 1);
        if (String(row.orden) !== targetOrder) {
            row.orden = targetOrder;
            row.modificado = true;
            row.orderChanged = true;
        }
    });
}

function openDeleteCableModal() {
    const modal = document.getElementById('deleteCableModal');
    if (!modal) return;
    const input = document.getElementById('deleteCablePos');
    if (input) input.value = '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeDeleteCableModal() {
    const modal = document.getElementById('deleteCableModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function confirmDeleteCable() {
    const input = document.getElementById('deleteCablePos');
    if (!input) return;
    const posicion = input.value?.trim();
    if (!posicion) {
        showNotification('Introduce una POS válida para eliminar el cable', 'error');
        return;
    }
    const index = rawData.findIndex(r => String(r.posicion) === posicion);
    if (index === -1) {
        showNotification(`No se encontró la posición ${posicion}`, 'error');
        return;
    }
    const confirmed = window.confirm(`¿Deseas eliminar completamente el cable con POS ${posicion}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    const row = rawData[index];
    row.deleted = true;
    row.modificado = true;
    delete errorsMap[posicion];
    delete progressMap[posicion];
    registerChange();
    renderTable();
    updateErrorBadge();
    closeDeleteCableModal();
    showNotification(`Cable POS ${posicion} marcado como eliminado`, 'success');
}

function saveIncidencia() {
    const posicion = document.getElementById('crudPosicion')?.value?.trim();
    const ordenValue = document.getElementById('crudOrden')?.value?.trim();
    const cod_cable = document.getElementById('crudCodCable')?.value?.trim();
    const seccion = document.getElementById('crudSeccion')?.value?.trim();
    const longitud = document.getElementById('crudLongitud')?.value?.trim();
    const marcado = document.getElementById('crudMarcado')?.value?.trim();
    const cable_marca = document.getElementById('crudCableMarca')?.value?.trim();
    const de_elemento = document.getElementById('crudDeElemento')?.value?.trim();
    const de_punto = document.getElementById('crudDePunto')?.value?.trim();
    const de_terminal = document.getElementById('crudDeTerminal')?.value?.trim();
    const de_manguito = document.getElementById('crudDeManguito')?.value?.trim();
    const para_elemento = document.getElementById('crudParaElemento')?.value?.trim();
    const para_punto = document.getElementById('crudParaPunto')?.value?.trim();
    const para_terminal = document.getElementById('crudParaTerminal')?.value?.trim();
    const para_manguito = document.getElementById('crudParaManguito')?.value?.trim();
    const observaciones = document.getElementById('crudObservaciones')?.value?.trim();

    if (!posicion || !ordenValue) {
        showNotification('POS y Orden son obligatorios para añadir el cable', 'error');
        return;
    }

    const orden = parseInt(ordenValue, 10);
    if (isNaN(orden) || orden < 1) {
        showNotification('Orden debe ser un número entero válido mayor que 0', 'error');
        return;
    }

    const existsOrder = rawData.some(r => parseInt(r.orden, 10) === orden);
    if (existsOrder) {
        const applyShift = window.confirm(
            `El orden ${orden} ya existe. Pulsa Aceptar para desplazar hacia abajo los registros con orden >= ${orden} y reservar este lugar.`
        );
        if (!applyShift) {
            showNotification('Operación cancelada. Ajusta el orden antes de volver a intentar.', 'error');
            return;
        }
        shiftOrdersDown(orden);
    }

    const newRow = {
        posicion,
        orden: String(orden),
        cod_cable: cod_cable || '',
        seccion: seccion || '',
        longitud: longitud || '',
        marcado: marcado || '',
        cable_marca: cable_marca || '',
        de_elemento: de_elemento || '',
        de_punto: de_punto || '',
        de_terminal: de_terminal || '',
        de_manguito: de_manguito || '',
        para_elemento: para_elemento || '',
        para_punto: para_punto || '',
        para_terminal: para_terminal || '',
        para_manguito: para_manguito || '',
        observaciones: observaciones || '',
        modificado: true,
        added: true
    };

    rawData.push(newRow);
    normalizeOrdenes();
    registerChange();
    renderTable();
    closeCableModal();
    showNotification('Cable añadido correctamente y orden actualizado', 'success');
}

function deleteCableComplete() {
    const posicion = window.prompt('Introduce la POS del cable a eliminar:');
    if (!posicion) return;
    const posTrim = posicion.trim();
    const index = rawData.findIndex(r => String(r.posicion) === posTrim);
    if (index === -1) {
        showNotification(`No se encontró la posición ${posTrim}`, 'error');
        return;
    }
    const confirmed = window.confirm(`¿Deseas eliminar completamente el cable con POS ${posTrim}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    const row = rawData[index];
    row.deleted = true;
    row.modificado = true;
    delete errorsMap[posTrim];
    delete progressMap[posTrim];
    registerChange();
    renderTable();
    updateErrorBadge();
    showNotification(`Cable POS ${posTrim} marcado como eliminado`, 'success');
}
       async function exportSleevesToZip(mode = 'download') {
           if (!rawData || rawData.length === 0) return;
           const sleeveData = rawData.filter(r => r.de_manguito && r.de_manguito.toUpperCase() !== 'S/M');
           if (sleeveData.length === 0) return;
           const zip = new JSZip(), groupedSleeves = {};
           sleeveData.forEach(r => { const ref = r.de_manguito.trim(); if (!groupedSleeves[ref]) groupedSleeves[ref] = []; groupedSleeves[ref].push(r); });
           const cleanText = (val) => String(val || "").replace(/,/g, "").trim(), sanitize = (name) => name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 15);
           const teamPrefix = sanitize(reportMetadata.equipo || 'EQ');
          Object.keys(groupedSleeves).forEach(ref => {
               // Se inicializa con una cadena vacía para que la primera línea sea un salto de línea al unir con \r\n
               let contentLines = [""]; 
               groupedSleeves[ref].forEach(r => {
                   const marca = cleanText(r.cable_marca), o = `${cleanText(r.de_elemento)} ${cleanText(r.de_punto)}`, d = `${cleanText(r.para_elemento)} ${cleanText(r.para_punto)}`;
                   contentLines.push([marca, o, "", d, o, marca, d].join(","));
               });
               zip.file(`${teamPrefix}-${sanitize(ref)}.txt`, contentLines.join("\r\n"));
           });
           const zipBlob = await zip.generateAsync({ type: "blob" });
           const zipName = `${(reportMetadata.equipo || 'EQUIPO').replace(/[^a-zA-Z0-9]/g, '_')}.zip`;
           
           // Acción 1: Iniciar la descarga del archivo ZIP
           const a = document.createElement('a'); 
           a.href = URL.createObjectURL(zipBlob); 
           a.download = zipName;
           document.body.appendChild(a); 
           a.click(); 
           document.body.removeChild(a);
           
           // Acción 2 (Opcional): Abrir Outlook sin navegar fuera de la página
           if (mode === 'outlook') {
               const toast = document.getElementById('notificationToast');
               const span = toast.querySelector('span');
               span.innerText = "Confirmando descarga... Abriendo Outlook en breve";
               toast.classList.add('show');
 
               setTimeout(() => {
                   const subject = encodeURIComponent(`Archivos de Marcado - ${reportMetadata.equipo || 'Equipo'}`);
                   const body = encodeURIComponent(`Hola,\n\nSe han generado los archivos de marcado para el equipo: ${reportMetadata.equipo || '---'}.\n\n[ADJUNTA AQUÍ EL ARCHIVO "${zipName}" DE TU CARPETA DE DESCARGAS]\n\nSaludos.`);
                   const mailto = `mailto:?subject=${subject}&body=${body}`;
                   
                   // Técnica de Iframe invisible para mailto (previene redirección forzada del navegador)
                   const iframe = document.createElement("iframe");
                   iframe.style.display = "none";
                   iframe.src = mailto;
                   document.body.appendChild(iframe);
                   setTimeout(() => document.body.removeChild(iframe), 100);
 
                   // Restaurar UI
                   span.innerText = "Archivo generado y guardado en carpeta de descargas";
                   setTimeout(() => toast.classList.remove('show'), 2000);
               }, 2000); 
           } else {
               document.getElementById('notificationToast').classList.add('show'); 
               setTimeout(() => document.getElementById('notificationToast').classList.remove('show'), 3000);
           }
       }
function toggleMobileViewMenu() {
   const dd = document.getElementById('mobileViewDropdown');
   dd.classList.toggle('hidden');
}
function closeMobileViewMenu() {
   const dd = document.getElementById('mobileViewDropdown');
   dd.classList.add('hidden');
}
       function toggleSidebar() {
   const sidebar = document.getElementById('mainSidebar');
   const overlay = document.getElementById('sidebarOverlay');
   const isMobile = window.innerWidth < 768;
   if (isMobile) {
       const isOpen = sidebar.classList.contains('sidebar-open');
       sidebar.classList.toggle('sidebar-open', !isOpen);
       if (overlay) overlay.classList.toggle('hidden', isOpen);
   } else {
       sidebar.classList.toggle('hidden');
   }
}
function toggleToolbarFilters() {
   const panel = document.getElementById('toolbarFilterPanel');
   const btn = document.getElementById('btnToggleFilters');
   const isHidden = panel.classList.contains('hidden');
   panel.classList.toggle('hidden', !isHidden);
   panel.classList.toggle('flex', isHidden);
   btn.classList.toggle('text-sap-blue', isHidden);
   btn.classList.toggle('bg-sap-blue/10', isHidden);
}
function clearAllFiltersMobile() {
   document.getElementById('filterInputMobile').value = '';
   document.getElementById('filterMarcaInputMobile').value = '';
   document.getElementById('globalSearchInputMobile').value = '';
   clearAllFilters();
}
       function toggleSettings() { const el = document.getElementById('settingsDropdown'); if (el) el.classList.toggle('hidden'); }
       function toggleHelp() { const el = document.getElementById('helpModal'); if (el) { el.classList.toggle('hidden'); el.classList.toggle('flex'); } }
       function toggleDarkMode() { 
           const isDark = document.documentElement.classList.toggle('dark');
           const label = document.getElementById('themeLabel'); 
           if (label) label.innerText = isDark ? 'Modo Claro' : 'Modo Oscuro';
           // Persistencia de la elección
           localStorage.setItem('ICGVision_Theme', isDark ? 'dark' : 'light');
		   // Ocultamos el menú de ajustes inmediatamente tras conmutar el tema visual
		   document.getElementById('settingsDropdown')?.classList.add('hidden');
       }
	  
       function toggleFullScreen() { const d = document, el = d.documentElement; if (!d.fullscreenElement) { (el.requestFullscreen || el.webkitRequestFullscreen).call(el); } else { d.exitFullscreen(); } }
       function showLanding() { 
           const lp = document.getElementById('landingPage'); lp.classList.remove('hidden'); lp.style.opacity = '1'; 
           const breaker = document.getElementById('landingBreaker'); if (breaker) breaker.classList.remove('is-on'); 
           const eye = document.getElementById('landingEye'); if (eye) eye.classList.remove('eye-on'); 
           const fileInput = document.getElementById('csvInputLanding'); if (fileInput) fileInput.value = ''; 
       }
 
       function toggleColConfig() { 
           const el = document.getElementById('colConfigDropdown'); 
           if (el) {
               if (el.classList.contains('hidden')) {
                   renderColumnConfig();
               }
               el.classList.toggle('hidden'); 
           }
       }
 
       function renderColumnConfig() { 
           const list = document.getElementById('columnConfigConfigList'); 
           if (!list) return; 
           list.innerHTML = columns.map(c => `<div class="flex items-center justify-between p-2 border-b border-sap-border/50 text-xs text-sap-text dark:text-white"><span>${c[currentLang] || c.en}</span><button onclick="toggleColumn('${c.id}')" class="text-sap-blue p-1 hover:bg-sap-blue/10 rounded"><i data-lucide="${c.visible ? 'eye' : 'eye-off'}" class="w-4 h-4"></i></button></div>`).join(''); 
           lucide.createIcons(); 
       }
 
       function toggleColumn(id) { 
   const c = columns.find(x => x.id === id); 
   if (c) { 
       c.visible = !c.visible; 
       updateView(); 
       renderColumnConfig(); // Forzamos el repintado inmediato del ojo (abierto/cerrado)
   } 
}
       function openDetailMode() {
           const elN = filterText.trim(); if (!elN) return;
           const s = elN.toLowerCase(), inputs = rawData.filter(r => (r.para_elemento||'').toLowerCase() === s), outputs = rawData.filter(r => (r.de_elemento||'').toLowerCase() === s);
           const pinMap = new Map(); inputs.forEach(c => { if (!pinMap.has(c.para_punto)) pinMap.set(c.para_punto, []); pinMap.get(c.para_punto).push({ ...c, type: 'in' }); });
           outputs.forEach(c => { if (!pinMap.has(c.de_punto)) pinMap.set(c.de_punto, []); pinMap.get(c.de_punto).push({ ...c, type: 'out' }); });
           detailPinSequence = Array.from(pinMap.keys()).sort((a, b) => a.localeCompare(b, undefined, {numeric: true})); detailPinDataMap = pinMap; currentDetailIndex = 0;
           if (detailPinSequence.length === 0) return;
           document.getElementById('detailElementName').innerText = elN.toUpperCase(); document.getElementById('detailModal').classList.remove('hidden'); document.getElementById('detailModal').classList.add('flex');
           renderDetailStep(); renderProgressList();
       }
       function closeDetailMode() { document.getElementById('detailModal').classList.add('hidden'); const s = filterText.trim(); if (s) drawDiagram(s); updateView(); }
       
      function renderDetailStep() {
   const pin = detailPinSequence[currentDetailIndex], connections = detailPinDataMap.get(pin);
   const currentElName = document.getElementById('detailElementName').innerText.toLowerCase();
   
   document.getElementById('currentPinLabel').innerText = pin; 
   document.getElementById('pinCounter').innerText = `PASO ${currentDetailIndex + 1} DE ${detailPinSequence.length}`;
   document.getElementById('btnPrevDetail').disabled = currentDetailIndex === 0; 
   
   const btnNext = document.getElementById('btnNextDetail');
   const isLastStep = currentDetailIndex === detailPinSequence.length - 1;
 
   if (isLastStep) {
       btnNext.innerHTML = 'TERMINAR <i data-lucide="check-circle" class="w-8 h-8"></i>';
       btnNext.classList.remove('bg-sap-blue');
       btnNext.classList.add('bg-emerald-500');
       btnNext.title = "Finalizar elemento y volver al esquema";
   } else {
       btnNext.innerHTML = 'SIGUIENTE <i data-lucide="chevron-right" class="w-8 h-8"></i>';
       btnNext.classList.remove('bg-emerald-500');
       btnNext.classList.add('bg-sap-blue');
       btnNext.title = "Siguiente punto de conexión";
   }
   btnNext.disabled = false;
 
   document.getElementById('progressFill').style.width = `${((currentDetailIndex + 1) / detailPinSequence.length) * 100}%`;
   
   document.getElementById('currentPinCables').innerHTML = connections.map(c => {
       const isOut = c.type === 'out';
       const termOrig = isOut ? c.de_terminal : c.para_terminal;
       const isPseudo = isKN(termOrig);
       
       // --- CONTROL ANTICRUZADO ESTRICTO PARA MANGUITOS EN MODO VISION ---
       let m = isOut ? c.de_manguito : (c.para_manguito || "S/M");
       if (m && (m === c.cable_marca || m === 'S/M' || m === 'S/E')) {
           // Si por desajuste de columnas coincide con la marca o es nulo, miramos si el manguito real está en de_manguito
           if (c.de_manguito && c.de_manguito !== c.cable_marca && c.de_manguito !== 'S/M') {
               m = c.de_manguito;
           } else {
               m = "S/M";
           }
       }
       // ------------------------------------------------------------------
       
       const peer = isOut ? c.para_elemento : c.de_elemento;
       const prog = progressMap[c.posicion] || { de: false, para: false };
       const row = rawData.find(r => r.posicion === c.posicion);
       
       let isCurrentSideOk = false;
       if (row) {
           if ((row.de_elemento || '').toLowerCase() === currentElName) isCurrentSideOk = prog.de === true;
           else if ((row.para_elemento || '').toLowerCase() === currentElName) isCurrentSideOk = prog.para === true;
       }
 
       const obs = c.observaciones && c.observaciones !== "---" ? c.observaciones : "";
       const crimpData = getCrimpingInfo(termOrig, c.seccion);
       const defaultSvg = `<svg viewBox="0 0 64 32" class="w-full h-full text-slate-600"><rect x="2" y="8" width="25" height="16" rx="2" fill="#ef4444"/><circle cx="45" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="45" cy="16" r="4" fill="currentColor"/><path d="M25 16 L35 16" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`;
 
       return `<div class="bg-sap-card dark:bg-sap-darkCard p-6 rounded-2xl border-l-8 ${isOut ? 'border-l-sap-blue' : 'border-l-emerald-500'} shadow-xl flex flex-col gap-4 ${isCurrentSideOk ? 'opacity-50 ring-2 ring-[#10b981]/30' : ''}">
           <div class="flex justify-between items-start text-left">
               <span class="px-3 py-1 bg-sap-shell/10 rounded text-[10px] font-black uppercase text-sap-secondaryText">${isOut?'Salida':'Entrada'}</span>
               <div class="flex items-center gap-2">
                   <input type="checkbox" ${isCurrentSideOk ? 'checked' : ''} 
                       onchange="toggleProgress('${c.posicion}', '${currentElName}')" 
                       class="w-4 h-4 accent-[#10b981] cursor-pointer">
                   <span class="text-2xl font-black text-sap-blue ml-2">${c.cable_marca}</span>
               </div>
           </div>
           <div class="grid grid-cols-2 gap-4"><div><p class="text-[9px] font-bold uppercase opacity-60">ID</p><p class="text-sm font-bold truncate">${c.cod_cable}</p></div><div><p class="text-[9px] font-bold uppercase opacity-60">Secc.</p><p class="text-sm font-bold">${c.seccion} mm²</p></div></div>
           <div class="p-3 bg-sap-shell/5 rounded-xl flex items-center gap-3"><div class="w-10 h-10 bg-sap-blue/10 flex items-center justify-center rounded-lg text-sap-blue"><i data-lucide="arrow-right-left" class="w-5 h-5"></i></div><div class="min-w-0"><p class="text-[9px] font-bold uppercase opacity-60">${isOut?'Destino':'Origen'}</p><p class="text-base font-black truncate text-sap-blue">${peer}</p></div></div>
           <div class="p-3 bg-sap-bg dark:bg-slate-900 rounded-xl flex items-center gap-3">
               ${!isPseudo ? `<div class="w-12 h-10 flex items-center justify-center shrink-0">${crimpData ? `<img src="${CRIMP_PATHS.terminales}${crimpData.img_pin}.jpg" class="max-h-full max-w-full object-contain" onerror="handlePinError(this)">` : `<div class="w-full h-full">${defaultSvg}</div>`}</div>` : ''}
               <div class="min-w-0 flex-1">
                   <p class="text-[9px] font-bold uppercase opacity-60">${isPseudo?'Instrucción':'Terminal'}</p>
                   <p class="text-base font-black truncate">${isPseudo?termOrig.substring(3):termOrig}</p>
                   <p class="text-[10px] text-sap-blue italic truncate">${masterMap.terminals[termOrig?.trim()]||""}</p>
               </div>
               ${crimpData ? `<button onclick="openCrimpingModal('${termOrig}', '${c.seccion}')" class="p-2 bg-sap-blue/10 text-sap-blue rounded-full hover:bg-sap-blue hover:text-white transition-all shadow-sm"><i data-lucide="wrench" class="w-4 h-4"></i></button>` : ''}
           </div>
          ${m && m !== "S/M" ? `
                    <div class="mt-2 flex flex-col w-full">
                        <div class="p-3 bg-sap-bg dark:bg-slate-900 rounded-xl flex items-center gap-3 mb-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div class="w-12 h-10 flex items-center justify-center shrink-0 bg-white rounded border border-slate-200 dark:border-slate-500 overflow-hidden p-0.5">
                                <img src="manguitos/${m.trim()}.jpg" class="max-h-full max-w-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <i data-lucide="layers" class="w-5 h-5 text-sap-blue" style="display: none;"></i>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-[9px] font-bold uppercase opacity-60">Manguito</p>
                                <p class="text-base font-black truncate">${m}</p>
                                <p class="text-[10px] text-sap-blue italic truncate">${masterMap.sleeves[m?.trim()] || 'Sin descripción técnica'}</p>
                            </div>
                        </div>
                        
                        <div class="flex flex-col gap-1 w-full">
                            <div class="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-0.5 ml-1">Marcaje Físico</div>
                            <div class="flex border border-black/30 rounded shadow-sm overflow-hidden font-mono text-[11px] text-black bg-[#FFFF99]">
                                <div class="w-1/2 border-r border-black/20 p-2 flex flex-col items-center justify-center text-center font-bold">
                                    <span>${c.cable_marca || ''}</span>
                                </div>
                                <div class="w-1/2 p-2 flex flex-col items-center justify-center text-center font-bold leading-tight">
                                    <span class="truncate w-full">${c.de_elemento || ''} ${c.de_punto || ''}</span>
                                    <span class="truncate w-full">${c.para_elemento || ''} ${c.para_punto || ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : ''}
`; 
   }).join(''); 
   lucide.createIcons(); 
}
        
       function renderProgressList() {
   const list = document.getElementById('detailProgressList');
   if (!list) return;
 
   const currentElName = document.getElementById('detailElementName').innerText.toLowerCase();
   
   list.innerHTML = detailPinSequence.map((pin, i) => { 
       const connections = detailPinDataMap.get(pin) || [];
       
       // EVALUACIÓN LOCAL ASIMÉTRICA: El punto está listo si todos los cables 
       // de este pin están validados en el extremo de este elemento actual.
       const isAllDone = connections.length > 0 && connections.every(c => {
           const prog = progressMap[c.posicion];
           if (!prog) return false;
 
           const row = rawData.find(r => r.posicion === c.posicion);
           if (!row) return false;
 
           if ((row.de_elemento || '').toLowerCase() === currentElName) {
               return prog.de === true;
           } else if ((row.para_elemento || '').toLowerCase() === currentElName) {
               return prog.para === true;
           }
           return false;
       });
       
       return `<button onclick="goToDetailStep(${i})" class="w-full flex items-center justify-center p-3 rounded-lg border text-center transition-all ${i === currentDetailIndex ? 'bg-sap-blue text-white shadow-lg scale-105' : (isAllDone ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200' : 'bg-white dark:bg-slate-800 border-sap-border')}">
           <div class="flex flex-col items-center gap-1 min-w-0">
               <span class="font-black text-sm truncate uppercase tracking-tighter">${pin}</span>
               <i id="tick-${i}" data-lucide="check-circle-2" class="w-3 h-3 text-[#10b981] ${isAllDone ? '' : 'hidden'}"></i>
           </div>
       </button>`; 
   }).join(''); 
   
   if (window.lucide) lucide.createIcons();
}
function nextDetailStep() {
   const p = detailPinSequence[currentDetailIndex];
   const cs = detailPinDataMap.get(p) || [];
   const currentElName = document.getElementById('detailElementName').innerText.toLowerCase();
   
   // Al pulsar Siguiente, aseguramos que el extremo de este elemento quede marcado como OK
   cs.forEach(c => {
       if (!progressMap[c.posicion]) progressMap[c.posicion] = { de: false, para: false };
       
       const row = rawData.find(r => r.posicion === c.posicion);
       if (row) {
           if ((row.de_elemento || '').toLowerCase() === currentElName) progressMap[c.posicion].de = true;
           if ((row.para_elemento || '').toLowerCase() === currentElName) progressMap[c.posicion].para = true;
       }
   });
   
   saveProgress();
   registerChange();
   updateGlobalProgress();
   
   // Control secuencial de pasos del asistente Modo Visión
   if (currentDetailIndex < detailPinSequence.length - 1) {
       currentDetailIndex++;
       renderDetailStep();     // Carga el layout del siguiente pin
       renderProgressList();   // Ilumina el tick verde del paso que acabamos de completar
   } else {
       closeDetailMode();      // Si es el último paso del componente, salimos de forma limpia
   }
}
       function prevDetailStep() { if (currentDetailIndex > 0) { currentDetailIndex--; renderDetailStep(); renderProgressList(); } }
       function goToDetailStep(idx) { currentDetailIndex = idx; renderDetailStep(); renderProgressList(); }
 
       function updateMetadataUI() { document.getElementById('meta-equipo').innerText = reportMetadata.equipo || '---'; document.getElementById('meta-desc').innerText = reportMetadata.desc || '---'; document.getElementById('meta-lista').innerText = reportMetadata.lista || '---'; document.getElementById('meta-edicion').innerText = reportMetadata.edicion || '---'; document.getElementById('meta-fecha').innerText = reportMetadata.fecha || '---'; document.getElementById('meta-plano').innerText = reportMetadata.plano || '---'; }
       function clearAllFilters() { document.getElementById('filterInput').value = ''; document.getElementById('filterMarcaInput').value = ''; document.getElementById('globalSearchInput').value = ''; filterText = ''; filterMarcaText = ''; selectedMaterial = null; currentMatchIdx = -1; document.getElementById('searchCounter').innerText = ''; document.getElementById('elementQuickActions').classList.add('hidden'); updateView(); }
       function applyTableFilter(v) { 
   filterText = v; 
   selectedMaterial = null; 
   document.getElementById('filterInput').value = v;
   const qa = document.getElementById('elementQuickActions');
   qa.classList.toggle('hidden', !v.trim());
   qa.classList.toggle('flex', !!v.trim());
   updateView(); 
}
function selectMaterial(name) {
    // Si pulsamos el mismo material, deseleccionamos. Si es distinto, lo asignamos.
    selectedMaterial = (selectedMaterial === name) ? null : name;
    // Forzamos el repintado de la tabla para aplicar las clases de color 'isSelected'
    renderTable();
}
         function handleFileUpload(event) {
           const f = event.target.files[0]; if (!f) return;
           const reader = new FileReader();
           reader.onload = (e) => {
               const d = new Uint8Array(e.target.result), wb = XLSX.read(d, { type: 'array' }), sh = wb.Sheets[wb.SheetNames[0]], json = XLSX.utils.sheet_to_json(sh, { header: "A" });
               const parseDate = (val) => { if (!val) return ''; let date = (typeof val === 'number') ? new Date((val - 25569) * 86400 * 1000) : new Date(val); return isNaN(date.getTime()) ? val.toString() : `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`; };
               const reportRow = json[1]; if (reportRow) { reportMetadata = { equipo: reportRow['Q']||'', desc: reportRow['R']||'', plano: reportRow['S']||'', lista: reportRow['T']||'', edicion: reportRow['U']||'', fecha: parseDate(reportRow['V']) }; }
               rawData = json.slice(1).map(row => ({ posicion: row['A']||'', orden: row['B']||'', cod_cable: row['C']||'', seccion: row['D']||'', longitud: row['E']||'', marcado: row['F']||'', cable_marca: row['G']||'', de_elemento: row['H']||'', de_punto: row['I']||'', de_terminal: row['J']||'', de_manguito: row['K']||'', para_elemento: row['M']||'', para_punto: row['N']||'', para_terminal: row['O']||'', para_manguito: row['L']||'', observaciones: row['P']||'', desc_cable: row['X']||'', desc_manguito: row['Y']||'', desc_terminal_de: row['Z']||'', desc_terminal_para: row['AA']||'' })).filter(r => r.posicion);
               rawData.forEach(r => { if (r.cod_cable && r.desc_cable) masterMap.cables[r.cod_cable.toString().trim()] = r.desc_cable; if (r.de_terminal && r.desc_terminal_de) masterMap.terminals[r.de_terminal.toString().trim()] = r.desc_terminal_de; if (r.para_terminal && r.desc_terminal_para) masterMap.terminals[r.para_terminal.toString().trim()] = r.desc_terminal_para; if (r.de_manguito && r.desc_manguito) masterMap.sleeves[r.de_manguito.toString().trim()] = r.desc_manguito; if (r.para_manguito && r.desc_manguito) masterMap.sleeves[r.para_manguito.toString().trim()] = r.desc_manguito; });
loadProgress(); loadErrors(); hasUnsavedChanges = false; updateSaveButton(); updateGlobalProgress(); updateErrorBadge(); document.getElementById('landingPage').classList.add('hidden'); updateMetadataUI(); updateView();
           }; reader.readAsArrayBuffer(f);
       }
       function handleBreakerClick(event) { if (event) event.stopPropagation(); const b = document.getElementById('landingBreaker'), e = document.getElementById('landingEye'); b.classList.add('is-on'); if (e) e.classList.add('eye-on'); setTimeout(() => { const input = document.getElementById('csvInputLanding'); if (input) input.click(); }, 400); }
 
       function renderSummary() {
           const grid = document.getElementById('summaryGrid'), tableC = document.getElementById('summaryTableContainer'), tableB = document.getElementById('summaryTableBody'), title = document.getElementById('summaryTitle'); 
           if(!grid || !title || !tableC) return;
           grid.innerHTML = ''; tableB.innerHTML = ''; let stats = {}; 
           const exportGroup = document.getElementById('sleeveExportGroup');
           exportGroup.classList.toggle('hidden', currentView !== 'summary-sleeves');
 
           if (currentView === 'summary-cables') { 
               title.innerText = i18n[currentLang].cableSum; rawData.forEach(r => { if(r.cod_cable) { const c = r.cod_cable.trim(); if(!stats[c]) stats[c]={count:0,length:0,desc:masterMap.cables[c]||""}; stats[c].count++; stats[c].length+=parseFloat((r.longitud||"0").toString().replace(',','.'))||0; } }); 
           } else if (currentView === 'summary-terminals') { 
               title.innerText = i18n[currentLang].termList; rawData.forEach(r => { [r.de_terminal, r.para_terminal].forEach(t => { if (t && t.toUpperCase()!=='S/T' && !isKN(t)) { const c = t.trim(); if(!stats[c]) stats[c]={count:0,desc:masterMap.terminals[c]||""}; stats[c].count++; } }); }); 
           } else { 
               title.innerText = i18n[currentLang].sleeveList; rawData.forEach(r => { if(r.de_manguito && r.de_manguito.toUpperCase()!=='S/M') { const c = r.de_manguito.trim(); if(!stats[c]) stats[c]={count:0,desc:masterMap.sleeves[c]||""}; stats[c].count++; } }); 
           }
           currentSummaryStats = stats; const entries = Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0], undefined, {numeric: true}));
           if (!entries.length) { grid.innerHTML = `<p class="col-span-full py-12 text-center text-sap-secondaryText">${i18n[currentLang].noItems}</p>`; return; }
           document.getElementById('btnSummaryCards').classList.toggle('text-sap-blue', summaryViewMode === 'cards');
           document.getElementById('btnSummaryTable').classList.toggle('text-sap-blue', summaryViewMode === 'table');
           if (summaryViewMode === 'cards') {
               grid.classList.remove('hidden'); tableC.classList.add('hidden');
               grid.innerHTML = entries.map(([ref, val]) => `<div class="bg-blue-50/20 dark:bg-slate-800/50 p-4 rounded-sm border-t-4 border-t-sap-blue border-l-4 border-l-sap-blue/20 border-r border-b border-sap-border dark:border-slate-700 shadow-sm group hover:shadow-lg transition-all text-left"><div class="text-[9px] font-black text-sap-secondaryText uppercase mb-1 tracking-wider">${ref}</div><div class="text-xs font-bold mb-4 h-8 overflow-hidden leading-snug">${val.desc || '---'}</div><div class="flex justify-between items-end"><div><div class="text-[9px] uppercase font-black text-sap-blue/60">Cantidad</div><div class="text-2xl font-black tabular-nums">${val.count}</div></div>${val.length?`<div><div class="text-[9px] uppercase font-black text-sap-blue/60">Longitud</div><div class="text-lg font-black text-sap-blue">${val.length.toFixed(2)}m</div></div>`:''}</div></div>`).join('');
           } else {
               grid.classList.add('hidden'); tableC.classList.remove('hidden');
               tableB.innerHTML = entries.map(([ref, val]) => `<tr class="border-b border-sap-border dark:border-slate-700 hover:bg-sap-blue/5 transition-colors"><td class="p-3 text-xs font-bold text-sap-blue">${ref}</td><td class="p-3 text-xs">${val.desc || '---'}</td><td class="p-3 text-sm font-black text-center tabular-nums">${val.count}</td></tr>`).join('');
           }
       }
 
       function setSummaryMode(mode) { summaryViewMode = mode; renderSummary(); lucide.createIcons(); }
        function sortTable(key) {
   if (currentSortCol === key) {
       sortAsc = !sortAsc;
   } else {
       currentSortCol = key;
       sortAsc = true;
   }
   renderTable();
}
       function changeView(v) { currentView = v; updateView(); }
    
       function adjustZoom(f) { currentZoom = Math.min(Math.max(currentZoom * f, 0.2), 5); updateViewBox(); }
      function fitDiagramToScreen() {
           const container = document.getElementById('diagramContainer');
           if (!container || !baseViewBox.w || !baseViewBox.h) return;
           const padding = 20;
           const availW = container.clientWidth  - padding * 2;
           const availH = container.clientHeight - padding * 2;
           if (availW <= 0 || availH <= 0) return;
           const fitZoom = Math.min(availW / baseViewBox.w, availH / baseViewBox.h);
           currentZoom = fitZoom > 1 ? 1 : fitZoom;
           panX = 0; panY = 0;
           updateViewBox();
       }
       function resetZoomAndPan() { fitDiagramToScreen(); }
       function updateViewBox() { const s = document.getElementById('diagramSvg'); if (!s || !baseViewBox.w) return; const w = baseViewBox.w / currentZoom, h = baseViewBox.h / currentZoom, x = (baseViewBox.w - w)/2 - (panX/currentZoom), y = (baseViewBox.h - h)/2 - (panY/currentZoom); s.setAttribute('viewBox', `${x} ${y} ${w} ${h}`); }
       function hidePinPopover() { const p = document.getElementById('pinPopover'); if (!p) return; p.classList.remove('show'); setTimeout(() => { if (!p.classList.contains('show')) p.classList.add('hidden'); }, 300); }
       
       function showInfoPopover(e, s) {
   e.stopPropagation();
   const d = JSON.parse(decodeURIComponent(s)),
       p = document.getElementById('pinPopover'),
       c = document.getElementById('popoverContent'),
       h = document.getElementById('popoverPinName');
   
   if (!p || !c || !h) return;
   let html = '';
 
   if (d.type === 'pin') {
       h.innerText = `Punto de Conexión: ${d.pin}`;
       d.connections.forEach((cn, idx) => {
           const tDesc = masterMap.terminals[cn.term?.trim()] || "",
               sDesc = masterMap.sleeves[cn.sleeve?.trim()] || "",
               isPseudoTerminal = isKN(cn.term);
 
           // Buscamos los datos del cable para obtener la sección necesaria para el crimpado
           const cableData = rawData.find(wire => wire.cable_marca === cn.label);
           const section = cableData ? cableData.seccion : "";
           const crimpData = getCrimpingInfo(cn.term, section);
 
           html += `<div class="${idx > 0 ? 'mt-4 pt-3 border-t-2 border-slate-200 dark:border-slate-600' : ''}">
                <div class="flex items-center justify-between mb-2">
                    <span class="bg-sap-blue text-white px-2 py-0.5 rounded text-[9px] font-black uppercase cursor-pointer" onclick="showInfoPopover(event, '${encodeURIComponent(JSON.stringify({type:'cable', label: cn.label}))}')">Cable: ${cn.label}</span>
                    ${crimpData ? `<button onclick="openCrimpingModal('${cn.term}', '${section}')" class="p-1 bg-sap-blue text-white rounded hover:bg-sap-darkBlue transition-colors"><i data-lucide="wrench" class="w-3 h-3"></i></button>` : ''}
                </div>
                <div class="space-y-3">
                    <div class="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-200 dark:border-slate-600">
                        <div class="flex items-center gap-2 text-sap-blue dark:text-sky-400 mb-1">
                            <div class="w-12 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-500 overflow-hidden shrink-0">
                                ${!isPseudoTerminal && cn.term ? 
                                    `<img src="${CRIMP_PATHS.terminales}${cn.term.trim()}.jpg" class="max-h-full max-w-full object-contain" onerror="handlePinError(this)">`
                                    : (isPseudoTerminal ? '' : `<i data-lucide="pin" class="w-3.5 h-3.5"></i>`)
                                }
                            </div>
                            <span class="font-bold uppercase tracking-tighter text-[10px]">${isPseudoTerminal ? 'Instrucción' : 'Terminal'}</span>
                        </div>
                        <div class="${!isPseudoTerminal ? 'pl-14' : ''}">
                            <div class="font-black text-xs text-slate-800 dark:text-slate-100">${isPseudoTerminal ? cn.term.substring(3) : cn.term || 'S/T'}</div>
                            <div class="text-[10px] text-slate-500 dark:text-slate-400 italic leading-tight">${tDesc}</div>
                        </div>
                    </div>

                    ${cn.sleeve && cn.sleeve !== 'S/M' ? `
                    <div class="mt-2 flex flex-col gap-2 w-full">
                        <div class="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-200 dark:border-slate-600">
                            <div class="flex items-center gap-2 text-sap-blue dark:text-sky-400 mb-1">
                                <div class="w-12 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-500 overflow-hidden shrink-0 p-0.5">
                                    <img src="manguitos/${cn.sleeve.trim()}.jpg" class="max-h-full max-w-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                    <i data-lucide="layers" class="w-3.5 h-3.5" style="display: none;"></i>
                                </div>
                                <span class="font-bold uppercase tracking-tighter text-[10px]">Manguito</span>
                            </div>
                            <div class="pl-14">
                                <div class="font-black text-xs text-slate-800 dark:text-slate-100">${cn.sleeve}</div>
                                <div class="text-[10px] text-slate-500 dark:text-slate-400 italic leading-tight">${sDesc || 'Sin descripción técnica'}</div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col gap-1 w-full">
                            <div class="flex border border-black/30 rounded shadow-sm overflow-hidden font-mono text-[11px] text-black bg-[#FFFF99]">
                                <div class="w-1/2 border-r border-black/20 p-2 flex flex-col items-center justify-center text-center font-bold">
                                    <span>${cn.label || ''}</span>
                                </div>
                                <div class="w-1/2 p-2 flex flex-col items-center justify-center text-center font-bold leading-tight">
                                    <span class="truncate w-full">${cableData ? (cableData.de_elemento || '') + ' ' + (cableData.de_punto || '') : ''}</span>
                                    <span class="truncate w-full">${cableData ? (cableData.para_elemento || '') + ' ' + (cableData.para_punto || '') : ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>`;
       });
  } else if (d.type === 'cable') {
       const cd = d.posicion
           ? rawData.find(r => r.posicion === d.posicion)
           : rawData.find(r => r.cable_marca === d.label);
       const allCd = cd ? [cd] : [];
       h.innerText = `Detalle de Cable: ${d.label}`;
       const longitudesHtml = allCd.map(r => `
           <div class="flex justify-between items-center py-1 border-b border-amber-200 dark:border-amber-700/50 last:border-0">
               <span class="text-[10px] text-amber-700 dark:text-amber-400 truncate max-w-[60%]">${(r.de_elemento || '---').toUpperCase()} → ${(r.para_elemento || '---').toUpperCase()}</span>
               <span class="text-sm font-black text-amber-600 dark:text-amber-300 ml-2">${r.longitud || '0'} m</span>
           </div>`).join('');
       html = `<div class="space-y-3">
           <div class="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-600">
               <p class="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">Código ID</p>
               <p class="text-sm font-black text-sap-blue dark:text-sky-400">${cd?.cod_cable || '---'}</p>
           </div>
           <div class="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-600">
               <p class="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">Descripción</p>
               <p class="text-xs font-bold leading-tight text-slate-800 dark:text-slate-100">${masterMap.cables[cd?.cod_cable?.toString()?.trim()] || "Sin descripción técnica"}</p>
           </div>
           <div class="bg-amber-50 dark:bg-amber-900/30 p-3 rounded border border-amber-200 dark:border-amber-700">
               <p class="text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400 mb-2">Longitud${allCd.length > 1 ? ' por tramo' : ''}</p>
               ${longitudesHtml}
           </div>
       </div>`;
   }
 
   c.innerHTML = html;
   p.style.left = `24px`;
   p.style.top = `24px`;
   p.classList.remove('hidden');
   void p.offsetWidth;
   p.classList.add('show');
   lucide.createIcons();
}
 
  // 1. Panel de Materiales y Lógica de Gráfico
function renderMaterialPanel(elementName) {
   const list = document.getElementById('materialPanelList');
   const panel = document.getElementById('materialPanel');
   const search = elementName.toLowerCase();
   
   // Filtramos las filas donde interviene el elemento seleccionado
   const rows = rawData.filter(r => 
       (r.de_elemento || '').toLowerCase() === search || 
       (r.para_elemento || '').toLowerCase() === search
   );
   
   const materialCounts = {};
 
   rows.forEach(r => {
       const esOrigen = (r.de_elemento || '').toLowerCase() === search;
       const esDestino = (r.para_elemento || '').toLowerCase() === search;
 
       // 1. Procesar Terminales (Mismo criterio que la barra lateral de conexiones)
       if (esOrigen && r.de_terminal && r.de_terminal !== 'S/T' && !isKN(r.de_terminal)) {
           const cod = r.de_terminal.toString().trim();
           if (!materialCounts[cod]) {
               materialCounts[cod] = { qty: 0, desc: masterMap.terminals[cod] || 'Sin descripción técnica' };
           }
           materialCounts[cod].qty += 1;
       }
       if (esDestino && r.para_terminal && r.para_terminal !== 'S/T' && !isKN(r.para_terminal)) {
           const cod = r.para_terminal.toString().trim();
           if (!materialCounts[cod]) {
               materialCounts[cod] = { qty: 0, desc: masterMap.terminals[cod] || 'Sin descripción técnica' };
           }
           materialCounts[cod].qty += 1;
       }
 
       // 2. Procesar Manguitos (Basado estrictamente en r.de_manguito por cable)
       // Como el manguito calza con el cable independientemente del sentido, evaluamos r.de_manguito
       if ((esOrigen || esDestino) && r.de_manguito && r.de_manguito !== 'S/M' && r.de_manguito !== 'S/E') {
           const cod = r.de_manguito.toString().trim();
           // Control estricto anti-cruce: Si coincide con la marca del cable por desfase, se ignora
           if (cod !== (r.cable_marca || '').toString().trim()) {
               if (!materialCounts[cod]) {
                   materialCounts[cod] = { qty: 0, desc: masterMap.sleeves[cod] || r.desc_manguito || 'Sin descripción técnica' };
               }
               materialCounts[cod].qty += 1;
           }
       }
   });
 
   const items = Object.entries(materialCounts);
   if (items.length === 0) {
       panel.classList.add('hidden');
       return;
   }
 
   list.innerHTML = items.map(([name, data]) => `
       <div class="p-2 border-b dark:border-slate-700 last:border-0 flex justify-between items-center text-xs">
           <div class="min-w-0 flex-1">
               <p class="font-bold text-sap-blue truncate">${name}</p>
               <p class="text-[10px] text-sap-secondaryText truncate">${data.desc}</p>
           </div>
           <span class="ml-3 px-2 py-0.5 bg-sap-blue/10 text-sap-blue font-black rounded-full text-[10px]">${data.qty} uds</span>
       </div>
   `).join('');
   
   panel.classList.remove('hidden');
   if (window.lucide) lucide.createIcons();
}
 
function openGraphicalView() { 
   const s = filterText.trim(); 
   if (!s) return; 
   
   // Obtener el elemento y asignar el texto
   const headerElement = document.getElementById('graphElementName');
   headerElement.innerText = s.toUpperCase(); 
   
   // Asociar el evento directamente sobre el elemento existente
   headerElement.onclick = function() {
       const panel = document.getElementById('materialPanel');
       if (panel.classList.contains('hidden')) {
           renderMaterialPanel(s);
           panel.classList.remove('hidden');
       } else {
           panel.classList.add('hidden');
       }
   };
   
   // Abrir el modal
   document.getElementById('materialPanel').classList.add('hidden');
   document.getElementById('graphModal').classList.remove('hidden'); 
   document.getElementById('graphModal').classList.add('flex'); 
   
   currentZoom = 1; panX = 0; panY = 0;
   drawDiagram(s);
  requestAnimationFrame(() => { fitDiagramToScreen(); });
}
 
function toggleMaterialPanel() {
   const s = filterText.trim();
   if (!s) return;
   const panel = document.getElementById('materialPanel');
   if (panel.classList.contains('hidden')) {
       renderMaterialPanel(s);
       panel.classList.remove('hidden');
   } else {
       panel.classList.add('hidden');
   }
}
 
function closeGraphicalView() { 
   document.getElementById('graphModal').classList.add('hidden'); 
   document.getElementById('materialPanel').classList.add('hidden'); // Cerramos panel
   hidePinPopover(); 
   updateView(); 
}
  
       
       function navigateToElement(t) { filterText = t; document.getElementById('filterInput').value = t; document.getElementById('elementQuickActions').classList.remove('hidden'); updateView(); drawDiagram(t); document.getElementById('graphElementName').innerText = t.toUpperCase(); }
       function markCurrentElementAsFinished() {
           const search = filterText.trim().toLowerCase();
           if (!search || rawData.length === 0) return;
 
           // 1. Recorremos todos los cables para identificar cuáles tocan este elemento
           rawData.forEach(r => {
               const isDe = (r.de_elemento || '').toLowerCase() === search;
               const isPara = (r.para_elemento || '').toLowerCase() === search;
 
               if (isDe || isPara) {
                   // Inicializamos el objeto si no existe
                   if (!progressMap[r.posicion]) {
                       progressMap[r.posicion] = { de: false, para: false };
                   }
                   
                   // Marcamos solo el extremo que corresponde al elemento actual
                   if (isDe) progressMap[r.posicion].de = true;
                   if (isPara) progressMap[r.posicion].para = true;
               }
           });
 
           // 2. Persistencia y actualización de datos de fondo
           saveProgress();
           registerChange();
           updateGlobalProgress();
           
           // 3. REFRESH VISUAL: Volvemos a dibujar el diagrama para que se vea todo verde
           // pero NO llamamos a closeGraphicalView(), así permaneces en la pantalla
           drawDiagram(search);
           
           // 4. Feedback visual opcional: un pequeño aviso de que se ha procesado
           const toast = document.getElementById('notificationToast');
           if (toast) {
               const span = toast.querySelector('span');
               if (span) span.innerText = `Elemento ${search.toUpperCase()} completado localmente`;
               toast.classList.add('show');
               setTimeout(() => toast.classList.remove('show'), 2000);
           }
       }
       
       function drawDiagram(elementName) {
   const svg = document.getElementById('diagramSvg'); if (!svg) return; svg.innerHTML = ''; 
   const search = elementName.toLowerCase();
   
   const allRelated = rawData.filter(r => (r.de_elemento||'').toLowerCase() === search || (r.para_elemento||'').toLowerCase() === search);
   const internalBridges = allRelated.filter(r => (r.de_elemento||'').toLowerCase() === search && (r.para_elemento||'').toLowerCase() === search);
 
   const pinMap = new Map(); 
   allRelated.forEach(c => {
       if ((c.de_elemento||'').toLowerCase() === search) {
           const p = c.de_punto;
           if (!pinMap.has(p)) pinMap.set(p, { in: [], out: [] });
           pinMap.get(p).out.push(c);
       }
       if ((c.para_elemento||'').toLowerCase() === search) {
           const p = c.para_punto;
           if (!pinMap.has(p)) pinMap.set(p, { in: [], out: [] });
           pinMap.get(p).in.push(c);
       }
   });
 
   const sortedPins = Array.from(pinMap.keys()).sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
   const rowH = 80, colW = 350, mainW = 120; 
   const totalW = (colW * 2) + mainW + 100, totalH = (sortedPins.length * rowH) + 150;
   const pinYMap = {}; const mX = 50 + colW, sY = 80; 
   
   sortedPins.forEach((pin, i) => { pinYMap[pin] = sY + (i * rowH); });
    baseViewBox = { x: 0, y: 0, w: totalW, h: totalH }; updateViewBox();
   
   svg.innerHTML += `<rect x="${mX}" y="${sY-50}" width="${mainW}" height="35" rx="2" class="diag-header"/><text x="${mX+mainW/2}" y="${sY-28}" text-anchor="middle" fill="white" style="font-size:14px; font-weight:900">${elementName.toUpperCase()}</text>`;
   
   // 1. PUENTES INTERNOS
internalBridges.forEach((b, idx) => {
    const y1 = pinYMap[b.de_punto], y2 = pinYMap[b.para_punto];
    if (y1 === undefined || y2 === undefined) return;
    const arcX = mX + mainW + 40 + (idx * 20);
    const prog = progressMap[b.posicion] || { de: false, para: false };
    const bridgeColor = (prog.de && prog.para) ? '#10b981' : '#f97316';
    
    // Dibuja la manguera física del puente (Línea discontinua)
    svg.innerHTML += `<path d="M ${mX + mainW} ${y1} L ${arcX} ${y1} L ${arcX} ${y2} L ${mX + mainW} ${y2}" fill="none" stroke="${bridgeColor}" stroke-width="3" stroke-dasharray="6 3" opacity="0.8" />`;
    
    // [NUEVO] Dibuja los bornes o puntos de conexión del puente sobre el borde de la caja del elemento
    svg.innerHTML += `<circle cx="${mX + mainW}" cy="${y1}" r="4" fill="${bridgeColor}" stroke="${bridgeColor === '#10b981' ? '#059669' : '#ea580c'}" stroke-width="1" opacity="0.9" pointer-events="none" />`;
    svg.innerHTML += `<circle cx="${mX + mainW}" cy="${y2}" r="4" fill="${bridgeColor}" stroke="${bridgeColor === '#10b981' ? '#059669' : '#ea580c'}" stroke-width="1" opacity="0.9" pointer-events="none" />`;
    
    // Dibuja la etiqueta de texto con la marca del cable puente
    svg.innerHTML += ` <text x="${arcX + 14}" y="${(y1 + y2) / 2}" text-anchor="middle" class="diag-text-wire cursor-pointer" onclick="showInfoPopover(event, '${encodeURIComponent(JSON.stringify({type:'cable', label: b.cable_marca, posicion: b.posicion}))}')" transform="rotate(-90, ${arcX + 14}, ${(y1 + y2) / 2})" style="fill:${bridgeColor}; font-size:10px; font-weight:900; letter-spacing: 0.5px;"> ${b.cable_marca} </text>`;
});
 
      // 2. PINES Y CONEXIONES EXTERNAS
   sortedPins.forEach((pin) => {
       const y = pinYMap[pin], pD = pinMap.get(pin);
       
       // Formateo del popover usando las propiedades reales verificadas contra la marca
      const pCs = [
           ...pD.in.map(c => ({ 
               term: c.para_terminal, 
               sleeve: (c.de_manguito !== c.cable_marca) ? c.de_manguito : 'S/M', 
               label: c.cable_marca,
               posicion: c.posicion
           })), 
           ...pD.out.map(c => ({ 
               term: c.de_terminal, 
               sleeve: (c.de_manguito !== c.cable_marca) ? c.de_manguito : 'S/M', 
               label: c.cable_marca,
               posicion: c.posicion
           }))
       ];
       
       const cablesConMarcaIn  = pD.in.filter(c => (c.cable_marca||'') !== '' && (c.de_elemento||'').toLowerCase() !== search);
       const cablesConMarcaOut = pD.out.filter(c => (c.cable_marca||'') !== '' && (c.para_elemento||'').toLowerCase() !== search);
       const totalPin    = cablesConMarcaIn.length + cablesConMarcaOut.length;
       const completadosPin = cablesConMarcaIn.filter(c => (progressMap[c.posicion]||{}).para === true).length
                            + cablesConMarcaOut.filter(c => (progressMap[c.posicion]||{}).de === true).length;
       const pinColor = totalPin === 0 ? '' 
                      : completadosPin === totalPin ? 'fill:#10b981; stroke:#059669;'
                      : completadosPin > 0          ? 'fill:#f97316; stroke:#ea580c;'
                      : '';
       const pinTextColor = document.documentElement.classList.contains('dark')
           ? '#ffffff'
           : (completadosPin === totalPin && totalPin > 0 ? '#ffffff' : '#0064d1');
       svg.innerHTML += `<rect x="${mX}" y="${y-15}" width="${mainW}" height="30" rx="2" class="diag-block diag-block-pin" style="${pinColor}" onclick="showInfoPopover(event, '${encodeURIComponent(JSON.stringify({type:'pin', pin, connections: pCs}))}')"/><text x="${mX+mainW/2}" y="${y+5}" text-anchor="middle" class="diag-text-main" style="fill:${pinTextColor}; pointer-events:none;">${pin}</text>`;
 
       const extIn = pD.in.filter(c => (c.de_elemento||'').toLowerCase() !== search);
       if (extIn.length > 0) {
           const stubX = mX - 100, blockRightEdge = stubX - 100;
           const anyLocalOk = extIn.some(c => (progressMap[c.posicion] || {}).para === true && (c.cable_marca||'') !== '');
           const extInConCable = extIn.filter(c => (c.cable_marca || '') !== '' || (c.observaciones || '').toUpperCase() === 'BUSBAR');
           extIn.forEach((c) => {
               const tieneCable = (c.cable_marca || '') !== '';
               const tieneObturador = !tieneCable && (c.para_terminal || '') !== '' && (c.para_terminal || '').toUpperCase() !== 'S/T' && !isKN(c.para_terminal);
               const isBusbar = (c.observaciones || '').toUpperCase() === 'BUSBAR';
               if (!tieneCable && !tieneObturador && !isBusbar) return;
               if (tieneObturador) {
                   svg.innerHTML += `<circle cx="${mX + mainW - 8}" cy="${y + 8}" r="4" fill="#64748b" opacity="0.8" pointer-events="none"/>`;
                   return;
               }
               const idx = extInConCable.indexOf(c);
               const isLocalOk = (progressMap[c.posicion] || {}).para === true;
               const lY = extInConCable.length > 1 ? y+(idx-(extInConCable.length-1)/2)*32 : y;
               const xInicio = extInConCable.length > 1 ? stubX : mX;
               const lineStyle = isBusbar ? `stroke:#a855f7; stroke-dasharray:4 3;` : `${isLocalOk?'stroke:#10b981;':''}`;
               const wireLabel = isBusbar ? 'BUSBAR' : c.cable_marca;
               const wireColor = isBusbar ? '#a855f7' : `${isLocalOk?'fill:#10b981; font-weight:900;':'font-size: 9px;'}`;
               svg.innerHTML += `<line x1="${xInicio}" y1="${lY}" x2="${blockRightEdge}" y2="${lY}" class="diag-line" style="${lineStyle}"/>
                   <rect x="${blockRightEdge - 160}" y="${lY-12}" width="160" height="24" rx="2" class="diag-block diag-block-side" onclick="navigateToElement('${c.de_elemento}')"/>
                   <text x="${document.dir === 'rtl' ? blockRightEdge - 8 : blockRightEdge - 152}" y="${lY+4}" class="diag-text-main" style="font-size:11px; pointer-events:none;">${c.de_elemento.toUpperCase()}</text>
                   <text x="${document.dir === 'rtl' ? blockRightEdge - 150 : blockRightEdge - 10}" y="${lY+4}" text-anchor="${document.dir === 'rtl' ? 'start' : 'end'}" class="diag-text-label" style="font-weight:900; pointer-events:none;">${c.de_punto}</text>
                  <text x="${(xInicio + blockRightEdge) / 2}" y="${lY-8}" text-anchor="middle" class="diag-text-wire cursor-pointer" onclick="showInfoPopover(event, '${encodeURIComponent(JSON.stringify({type:'cable', label: wireLabel, posicion: c.posicion}))}')" style="${wireColor}">${wireLabel}</text>`;
           });
           if (extInConCable.length > 1) {
               svg.innerHTML += `<line x1="${mX}" y1="${y}" x2="${stubX}" y2="${y}" class="diag-line" style="${anyLocalOk?'stroke:#10b981;':''}"/>
                                 <line x1="${stubX}" y1="${y+(-(extInConCable.length-1)/2)*32}" x2="${stubX}" y2="${y+((extInConCable.length-1)/2)*32}" class="diag-line" style="${anyLocalOk?'stroke:#10b981;':''}"/>`;
           }
       }
 
       const extOut = pD.out.filter(c => (c.para_elemento||'').toLowerCase() !== search);
       if (extOut.length > 0) {
           const origX = mX + mainW, stubX = origX + 100, blockLeftEdge = stubX + 100;
           const anyLocalOk = extOut.some(c => (progressMap[c.posicion] || {}).de === true && (c.cable_marca||'') !== '');
           const extOutConCable = extOut.filter(c => (c.cable_marca || '') !== '' || (c.observaciones || '').toUpperCase() === 'BUSBAR');
           extOut.forEach((c) => {
               const tieneCable = (c.cable_marca || '') !== '';
               const tieneObturador = !tieneCable && (c.de_terminal || '') !== '' && (c.de_terminal || '').toUpperCase() !== 'S/T' && !isKN(c.de_terminal);
               const isBusbar = (c.observaciones || '').toUpperCase() === 'BUSBAR';
               if (!tieneCable && !tieneObturador && !isBusbar) return;
               if (tieneObturador) {
                   svg.innerHTML += `<circle cx="${mX + mainW - 8}" cy="${y + 8}" r="4" fill="#64748b" opacity="0.8" pointer-events="none"/>`;
                   return;
               }
               const idx = extOutConCable.indexOf(c);
               const isLocalOk = (progressMap[c.posicion] || {}).de === true;
               const lY = extOutConCable.length > 1 ? y+(idx-(extOutConCable.length-1)/2)*32 : y;
               const xInicio = extOutConCable.length > 1 ? stubX : origX;
               const lineStyle = isBusbar ? `stroke:#a855f7; stroke-dasharray:4 3;` : `${isLocalOk?'stroke:#10b981;':''}`;
               const wireLabel = isBusbar ? 'BUSBAR' : c.cable_marca;
               const wireColor = isBusbar ? '#a855f7' : `${isLocalOk?'fill:#10b981; font-weight:900;':'font-size: 9px;'}`;
               svg.innerHTML += `<line x1="${xInicio}" y1="${lY}" x2="${blockLeftEdge}" y2="${lY}" class="diag-line" style="${lineStyle}"/>
                   <rect x="${blockLeftEdge}" y="${lY-12}" width="160" height="24" rx="2" class="diag-block diag-block-side" onclick="navigateToElement('${c.para_elemento}')"/>
                   <text x="${document.dir === 'rtl' ? blockLeftEdge + 10 : blockLeftEdge + 152}" y="${lY+4}" text-anchor="${document.dir === 'rtl' ? 'start' : 'end'}" class="diag-text-main" style="font-size:11px; pointer-events:none;">${c.para_elemento.toUpperCase()}</text>
                   <text x="${document.dir === 'rtl' ? blockLeftEdge + 150 : blockLeftEdge + 10}" y="${lY+4}" class="diag-text-label" style="font-weight:900; pointer-events:none;">${c.para_punto}</text>
                  <text x="${(xInicio + blockLeftEdge) / 2}" y="${lY-8}" text-anchor="middle" class="diag-text-wire cursor-pointer" onclick="showInfoPopover(event, '${encodeURIComponent(JSON.stringify({type:'cable', label: wireLabel, posicion: c.posicion}))}')" style="${wireColor}">${wireLabel}</text>`;
           });
           if (extOutConCable.length > 1) {
               svg.innerHTML += `<line x1="${origX}" y1="${y}" x2="${stubX}" y2="${y}" class="diag-line" style="${anyLocalOk?'stroke:#10b981;':''}"/>
                                 <line x1="${stubX}" y1="${y+(-(extOutConCable.length-1)/2)*32}" x2="${stubX}" y2="${y+((extOutConCable.length-1)/2)*32}" class="diag-line" style="${anyLocalOk?'stroke:#10b981;':''}"/>`;
           }
       }
   });
   if (window.lucide) lucide.createIcons();
}
 
       function globalSearchNext() { 
           const q = document.getElementById('globalSearchInput').value.trim().toLowerCase(), c = document.getElementById('searchCounter'), rs = Array.from(document.querySelectorAll('#tableBody tr'));
           if (!q) { currentMatchIdx = -1; c.innerText = ''; rs.forEach(r => r.classList.remove('search-row-match')); return; }
           const ms = rs.filter(row => row.innerText.toLowerCase().includes(q)); if (ms.length === 0) { c.innerText = '0/0'; return; }
           currentMatchIdx = (currentMatchIdx + 1) % ms.length; rs.forEach(r => r.classList.remove('search-row-match'));
           ms[currentMatchIdx].classList.add('search-row-match'); ms[currentMatchIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
           c.innerText = `${currentMatchIdx + 1}/${ms.length}`;
       }
       function startResize(e, col) { resizingCol = col; startX = e.clientX; startWidth = col.width; e.preventDefault(); }
       function hTHDragStart(e, i) { thDragIdx = i; }
       function hTHDragOver(e) { e.preventDefault(); }
       function hTHDrop(e, tIdx) { e.preventDefault(); const a = columns.filter(c => c.visible), d = a[thDragIdx], t = a[tIdx]; if(!d || !t) return; const rs = columns.findIndex(c => c.id === d.id), rd = columns.findIndex(c => c.id === t.id); columns.splice(rd, 0, columns.splice(rs, 1)[0]); updateView(); }
 
       // --- FUNCIONES ESPECÍFICAS CRIMPAR ---
 
       function getCrimpingInfo(terminalId, seccion) {
           if (!terminalId || !seccion) return null;
           const normSection = seccion.toString().replace('.', ',');
           const idToSearch = terminalId.toString().trim().toUpperCase();
           return crimpingMasterData.find(item => 
               item.id.toString().toUpperCase() === idToSearch && 
               item.seccion === normSection
           );
       }
 
 function openCrimpingModal(terminalId, seccion) {
           const data = getCrimpingInfo(terminalId, seccion);
           if (!data) return;
 
           const modal = document.getElementById('crimpingModal');
           const content = document.getElementById('crimpingModalContent');
           const imgFallback = "this.onerror=null; this.src='https://placehold.co/400x300?text=Imagen+no+disponible';";
 
           // Determinar si existen accesorios
           const hasAccessories = data.txt_pos || data.img_regul;
 
           content.innerHTML = `
               <div class="flex flex-col gap-4 text-left">
                   <!-- Cabecera de Datos -->
                   <div class="bg-white dark:bg-sap-darkCard border border-sap-border rounded-xl shadow-sm flex items-center px-6 py-2 gap-8">
                       <div class="w-16 h-12 bg-white border border-gray-100 rounded flex-shrink-0 flex items-center justify-center p-1">
                           <img src="${CRIMP_PATHS.terminales}${data.img_pin}.jpg" class="max-h-full max-w-full object-contain" onerror="${imgFallback}">
                       </div>
                       <div class="flex items-center gap-12 flex-grow text-left">
                           <div><p class="text-[8px] text-sap-secondaryText font-black uppercase tracking-wider">Terminal</p><p class="text-sm font-black text-sap-blue">${terminalId}</p></div>
                           <div class="min-w-0 flex-1"><p class="text-[8px] text-sap-secondaryText font-black uppercase tracking-wider">Descripción</p><p class="text-xs font-bold text-sap-text dark:text-white truncate max-w-[400px]">${data.txt_pin}</p></div>
                           <div><p class="text-[8px] text-sap-secondaryText font-black uppercase tracking-wider">Sección</p><p class="text-sm font-black text-sap-text dark:text-white">${data.seccion} mm²</p></div>
                       </div>
                   </div>
 
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <!-- PANEL 1: PELADO (Mantiene su estilo) -->
                       <div class="bg-white dark:bg-sap-darkCard border border-sap-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                           <div class="bg-emerald-500/5 px-4 py-2 border-b border-sap-border">
                               <span class="text-[10px] font-black uppercase tracking-widest text-emerald-700">INSTRUCCIONES DE PELADO</span>
                           </div>
                           <div class="p-4 flex flex-col flex-grow">
                               <div class="bg-white rounded-lg flex items-center justify-center p-2 mb-4 h-64 border border-gray-50 shadow-inner overflow-hidden">
                                   <img src="${CRIMP_PATHS.pelacables}${data.img_pela}.jpg" class="max-h-full w-full object-contain" onerror="${imgFallback}">
                               </div>
                               <div class="space-y-3">
                                   <div><p class="text-[9px] text-sap-secondaryText font-black uppercase tracking-tighter">Herramienta</p><p class="text-sm font-black text-sap-text dark:text-white leading-tight">${data.txt_pela}</p></div>
                                   <div class="pt-2 border-t border-emerald-100 mt-1">
                                       <span class="text-[9px] font-black text-emerald-800/60 uppercase tracking-tight">LONGITUD:</span>
                                       <span class="text-base font-black text-emerald-600 tabular-nums ml-1">${data.txt_longitud} mm</span>
                                   </div>
                               </div>
                           </div>
                       </div>
 
                       <!-- PANEL 2: CRIMPADO (Dinámico) -->
                       <div class="bg-white dark:bg-sap-darkCard border-2 border-sap-blue/30 rounded-xl shadow-md overflow-hidden flex flex-col text-left">
                           <div class="bg-sap-blue px-4 py-2 flex justify-between items-center text-white">
                               <span class="text-[10px] font-black uppercase tracking-widest text-white">HERRAMIENTA DE CRIMPADO</span>
                               <div class="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold">Matriz: ${data.txt_matriz || 'N/A'}</div>
                           </div>
                           
                           <div class="p-4 flex flex-col gap-4 flex-grow">
                               ${!hasAccessories ? `
                                   <!-- MODO GRANDE: Sin accesorios, la tenaza ocupa todo -->
                                   <div class="flex flex-col flex-grow">
                                       <div class="bg-white rounded-lg flex items-center justify-center p-4 mb-4 h-64 border border-gray-50 shadow-inner overflow-hidden">
                                           <img src="${CRIMP_PATHS.crimpadoras}${data.img_tenaza}.jpg" class="max-h-full w-full object-contain" onerror="${imgFallback}">
                                       </div>
                                       <div class="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200">
                                           <p class="text-[9px] text-sap-secondaryText font-black uppercase tracking-wider text-center">Tenaza (Vista General)</p>
                                           <p class="text-sm font-black text-sap-text dark:text-white text-center">${data.txt_tenaza}</p>
                                       </div>
                                   </div>
                               ` : `
                                   <!-- MODO DETALLE: Con accesorios, estructura reducida -->
                                   <div class="flex items-center gap-4 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200">
                                       <div class="w-20 h-14 bg-white border border-gray-200 rounded flex-shrink-0 flex items-center justify-center p-1">
                                           <img src="${CRIMP_PATHS.crimpadoras}${data.img_tenaza}.jpg" class="max-h-full w-full object-contain" onerror="${imgFallback}">
                                       </div>
                                       <div class="min-w-0 flex-1">
                                           <p class="text-[8px] text-sap-secondaryText font-black uppercase tracking-wider">Tenaza</p>
                                           <p class="text-xs font-black text-sap-text dark:text-white truncate">${data.txt_tenaza}</p>
                                       </div>
                                   </div>
                                   <div class="grid grid-cols-2 gap-3 flex-grow">
                                       <div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 rounded-xl p-3 flex flex-col items-center justify-between">
                                           <p class="text-[9px] text-amber-700 font-black uppercase mb-1 tracking-tighter text-center">Posicionador</p>
                                           <div class="w-full h-44 bg-white rounded border border-amber-100 flex items-center justify-center p-1 overflow-hidden shadow-sm">
                                               <img src="${CRIMP_PATHS.posicionadores}${data.img_pos}.jpg" class="max-h-full w-auto object-contain" onerror="${imgFallback}">
                                           </div>
                                           <p class="text-[10px] font-bold text-sap-text dark:text-white mt-2 text-center leading-tight">${data.txt_pos}</p>
                                       </div>
                                       ${data.img_regul ? `
                                       <div class="bg-blue-50 dark:bg-blue-900/10 border border-sap-blue/20 rounded-xl p-3 flex flex-col items-center justify-between">
                                           <p class="text-[9px] text-sap-blue font-black uppercase mb-1 tracking-tighter text-center">Regulación</p>
                                           <div class="w-full h-44 bg-white rounded border border-sap-blue/10 flex items-center justify-center p-1 overflow-hidden shadow-sm">
                                               <img src="${CRIMP_PATHS.regulacion}${data.img_regul.trim()}.jpg" class="max-h-full w-auto object-contain" onerror="${imgFallback}">
                                           </div>
                                           <p class="text-[10px] font-black text-sap-blue mt-2 text-center uppercase">Selector: ${data.img_regul}</p>
                                       </div>
                                       ` : ''}
                                   </div>
                               `}
                           </div>
                       </div>
 
                       <!-- PANEL 3: CALIDAD (Ancho completo abajo) -->
                       <div class="md:col-span-2 bg-white dark:bg-sap-darkCard border border-sap-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                           <div class="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                               <span class="text-[10px] font-black uppercase tracking-widest text-emerald-400">AYUDA VISUAL / CRITERIO DE CALIDAD</span>
                               ${data.txt_ext ? `<span class="text-[9px] font-bold text-white uppercase opacity-80">Extractor: ${data.txt_ext}</span>` : ''}
                           </div>
                           <div class="p-4 flex items-center justify-center bg-white h-80 shadow-inner">
                               <img src="${CRIMP_PATHS.ayuda}${data.img_obs}.jpg" class="max-h-full w-auto object-contain" onerror="${imgFallback}">
                           </div>
                       </div>
                   </div>
               </div>
           `;
           
           modal.classList.remove('hidden');
           modal.classList.add('flex');
           if (window.lucide) lucide.createIcons();
       }
 
       function closeCrimpingModal() {
           const modal = document.getElementById('crimpingModal');
           modal.classList.add('hidden');
           modal.classList.remove('flex');
       }
function handleHelpEasterEgg() {
   const msgBox = document.getElementById('easterEggMessage');
   if (!msgBox) return;
 
   // Reiniciar el temporizador en cada clic
   clearTimeout(helpClickTimer);
   
   // Si el mensaje ya se está mostrando, ignorar clics adicionales
   if (!msgBox.classList.contains('hidden')) return;
 
   helpClickCount++;
 
   // Si pasan más de 2 segundos entre clics, la cuenta vuelve a 0
   helpClickTimer = setTimeout(() => {
       helpClickCount = 0;
   }, 2000);
 
   // Al llegar a 7 clics
   if (helpClickCount === 7) {
       msgBox.classList.remove('hidden');
       msgBox.classList.add('block');
       
       // El mensaje se oculta automáticamente a los 10 segundos
       setTimeout(() => {
           msgBox.classList.add('hidden');
           msgBox.classList.remove('block');
           helpClickCount = 0; // Resetear cuenta para poder activarlo de nuevo
       }, 10000);
       
       helpClickCount = 0;
   }
}
// --- FUNCIONES DE RENDERIZADO DE TABLA Y VISTAS ---
       function updateView() { 
           const tV = document.getElementById('tableView'); 
           const sV = document.getElementById('summaryView'); 
           if (currentView === 'table') { 
               tV.classList.remove('hidden'); 
               sV.classList.add('hidden'); 
               renderTable(); 
           } else { 
               tV.classList.add('hidden'); 
               sV.classList.remove('hidden'); 
               renderSummary(); 
           } 
           lucide.createIcons(); 
       }
 
       function renderTable() {
           const h = document.getElementById('tableHeader'), b = document.getElementById('tableBody'), a = columns.filter(c => c.visible);
           
           // 1. Generar Cabecera
           h.innerHTML = `<tr class="bg-sap-shell text-white">${a.map((c, i) => {
               const isSorted = currentSortCol === c.key;
               const sortIcon = isSorted ? (sortAsc ? ' <i data-lucide="chevron-up" class="inline w-3 h-3"></i>' : ' <i data-lucide="chevron-down" class="inline w-3 h-3"></i>') : '';
               return `<th class="p-3 text-[10px] font-black uppercase border-r border-white/10 text-left relative cursor-pointer hover:bg-white/10 active:bg-sap-darkBlue transition-all select-none bg-sap-shell" 
                           style="width: ${c.width}px; min-width: ${c.width}px;" 
                           draggable="true" 
                           ondragstart="hTHDragStart(event, ${i})" 
                           ondragover="hTHDragOver(event)" 
                           ondrop="hTHDrop(event, ${i})"
                           onclick="sortTable('${c.key}')">
                           <span class="flex items-center gap-1">${c[currentLang]||c.en}${sortIcon}</span>
                           <div class="resizer" onmousedown="event.stopPropagation(); startResize(event, columns.find(col => col.id === '${c.id}'))"></div>
                       </th>`;
          }).join('')}<th class="p-3 w-20 text-center bg-sap-shell border-l border-white/10">
    <div class="flex items-center justify-center gap-2">
        <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-red-300 ${incidenciaModeActive ? '' : 'hidden'}" id="thIncidenciaIcon" title="Modo incidencias activo"></i>
        <button onclick="event.stopPropagation(); toggleColConfig()"><i data-lucide="settings" class="w-4 h-4"></i></button>
    </div>
</th></tr>`;
 
           // 2. Filtrado
           let d = [...rawData]; 
           if (filterText.trim()) { 
               const s = filterText.trim().toLowerCase(); 
               d = d.filter(r => (r.de_elemento||'').toLowerCase()===s || (r.para_elemento||'').toLowerCase()===s); 
           } 
           if (filterMarcaText.trim()) { 
               const s = filterMarcaText.trim().toLowerCase(); 
               d = d.filter(r => (r.cable_marca||'').toLowerCase().includes(s)); 
           }
 
           // 3. Ordenación
           if (currentSortCol) {
               d.sort((aRow, bRow) => {
                   let vA = aRow[currentSortCol] || '', vB = bRow[currentSortCol] || '';
                   const numA = parseFloat(String(vA).replace(',', '.')), numB = parseFloat(String(vB).replace(',', '.'));
                   let comp = (!isNaN(numA) && !isNaN(numB)) ? numA - numB : String(vA).localeCompare(String(vB), undefined, { numeric: true });
                   return sortAsc ? comp : -comp;
               });
           }
 
           // 4. Renderizado
           b.innerHTML = d.map(r => {
               const isFinished = isCableFinished(r.posicion);
               const isSelected = selectedMaterial && (r.de_terminal === selectedMaterial || r.para_terminal === selectedMaterial || r.de_manguito === selectedMaterial);
               const hasError = errorsMap[r.posicion] !== undefined;
               const rowClass = r.deleted ? 'row-deleted' : r.added ? 'row-added' : '';
               
               return `<tr class="border-b border-sap-border dark:border-slate-700 text-left ${isSelected?'bg-amber-100 dark:bg-blue-600/30':''} ${isFinished?'row-completed':''} ${rowClass} ${hasError?'border-l-4 border-l-red-500 dark:border-l-red-500':''}">
                   ${a.map(c => {
                       if (c.key === 'status') {
                           return `<td class="p-3 text-center border-r border-sap-border/20">
                               <input type="checkbox" ${isFinished ? 'checked' : ''} disabled 
                               class="w-4 h-4 accent-[#10b981] opacity-70 cursor-not-allowed">
                           </td>`;
                       }
                       const changes = errorsMap[r.posicion] || {};
                       const changedValue = changes[c.key] !== undefined ? changes[c.key] : undefined;
                       const v = changedValue !== undefined ? changedValue : (r[c.key]||'');
                       const isElementCol = v && c.key.includes('_elemento');
                       const isCellModified = changedValue !== undefined || (c.key === 'orden' && r.orderChanged && !r.deleted);
                       const cellClass = isCellModified ? (c.key === 'orden' && r.orderChanged ? 'cell-order-changed' : 'cell-modified') : '';
                       return `<td class="p-3 text-xs border-r border-sap-border/20 ${isElementCol?'font-bold text-sap-blue cursor-pointer hover:underline':''} ${cellClass}"
                                   style="width: ${c.width}px;" 
                                   ${isElementCol ? `onclick="applyTableFilter('${v}')"` : ''}>
                                   <div class="truncate">${v}</div>
                               </td>`;
                   }).join('')}
                   <td class="p-1 text-center min-w-[5rem] border-l border-sap-border/30 dark:border-slate-700">
                       <button onclick="${incidenciaModeActive ? `openErrorModal('${r.posicion}')` : 'void(0)'}"
                           title="${incidenciaModeActive ? (hasError ? 'Editar incidencia registrada' : 'Registrar incidencia en esta línea') : 'Activa el modo incidencias para registrar'}"
                           class="w-7 h-7 rounded flex items-center justify-center transition-colors
                               ${!incidenciaModeActive
                                   ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                   : hasError
                                       ? 'bg-red-300 dark:bg-red-600 text-red-600 dark:text-red-300 hover:bg-red-200'
                                       : 'bg-slate-50 border border-slate-200 text-slate-400 dark:bg-transparent dark:border-transparent hover:bg-sap-blue/10 hover:text-sap-blue'}">
                           <i class="fas ${hasError ? 'fa-exclamation-triangle' : 'fa-pencil-alt'} text-xs"></i>
                       </button>
                   </td>
               </tr>`;
           }).join('');
 
           // 5. Sidebar Materiales
           const sFilter = filterText.trim().toLowerCase(), matC = document.getElementById('elementMaterialsContainer');
           if (sFilter && rawData.length > 0) {
               matC.classList.remove('hidden'); 
               const mats = {};
               rawData.forEach(r => { 
                   if ((r.de_elemento||'').toLowerCase() === sFilter && r.de_terminal && r.de_terminal !== 'S/T' && !isKN(r.de_terminal)) mats[r.de_terminal] = (mats[r.de_terminal]||0)+1; 
                   if ((r.para_elemento||'').toLowerCase() === sFilter && r.para_terminal && r.para_terminal !== 'S/T' && !isKN(r.para_terminal)) mats[r.para_terminal] = (mats[r.para_terminal]||0)+1; 
                   if (((r.de_elemento || '').toLowerCase() === sFilter || (r.para_elemento || '').toLowerCase() === sFilter) && r.de_manguito && r.de_manguito !== 'S/M') mats[r.de_manguito] = (mats[r.de_manguito] || 0) + 1; 
               });
              document.getElementById('terminalsBody').innerHTML = Object.entries(mats).map(([name, qty]) => `
    <div onclick="selectMaterial('${name}')" 
         class="px-2 py-1.5 border-b dark:border-slate-700 flex justify-between items-center cursor-pointer 
         ${selectedMaterial === name ? 'bg-amber-100 dark:bg-blue-600/30' : 'hover:bg-sap-blue/5 dark:hover:bg-slate-700/50'}">
        <div class="flex flex-col min-w-0 flex-1">
            <span class="text-[10px] font-bold text-sap-text dark:text-slate-100">${name}</span>
            <span class="text-[9px] text-sap-blue italic truncate">${masterMap.terminals[name]||masterMap.sleeves[name]||''}</span>
        </div>
        <span class="text-[10px] font-black bg-sap-blue/10 px-2 rounded-full text-sap-blue">${qty}</span>
    </div>`).join('');
           } else { matC.classList.add('hidden'); }
           lucide.createIcons();
       }
       window.onload = () => {
           // 0. Cargar carpeta de autoguardado del Administrador (IndexedDB)
           _initAdminDirHandle();
           // 0b. Iniciar temporizador de autoguardado (cada 10 minutos si hay cambios)
           _startAutoSaveTimer();

           // 1. Recuperar tema persistido
           const savedTheme = localStorage.getItem('ICGVision_Theme');
           const themeLabel = document.getElementById('themeLabel');
           if (savedTheme === 'dark') {
               document.documentElement.classList.add('dark');
               if (themeLabel) themeLabel.innerText = 'Modo Claro';
           } else {
               document.documentElement.classList.remove('dark');
               if (themeLabel) themeLabel.innerText = 'Modo Oscuro';
           }
 
           // 2. Eventos de carga y filtros
           const fI = document.getElementById('csvInputLanding'); 
           if (fI) fI.addEventListener('change', handleFileUpload);
           
           document.getElementById('filterInput').addEventListener('input', (e) => { 
               filterText = e.target.value; 
               document.getElementById('elementQuickActions').classList.toggle('hidden', !filterText.trim()); 
               updateView(); 
           });
           
           document.getElementById('filterMarcaInput').addEventListener('input', (e) => { 
               filterMarcaText = e.target.value; 
               updateView(); 
           });
           
           document.getElementById('globalSearchInput').addEventListener('input', () => { 
               currentMatchIdx = -1; 
           });
 
           // 3. Gestión de ratón (Panning y Resizing)
           window.addEventListener('mousemove', (e) => { 
               if (isPanning) { 
                   panX += e.movementX; 
                   panY += e.movementY; 
                   updateViewBox(); 
               } 
               if (resizingCol) { 
                   resizingCol.width = Math.max(50, startWidth + (e.clientX - startX)); 
                   updateView(); 
               } 
           });
 
           window.addEventListener('mouseup', () => { 
               isPanning = false; 
               resizingCol = null; 
           });
 
           // 4. Gestión del Diagrama SVG
           const s = document.getElementById('diagramSvg'); 
           if (s) {
               s.addEventListener('mousedown', (e) => { 
                   if (e.target.closest('.diag-block-pin, .diag-block-side, .diag-text-wire')) return; 
                   isPanning = true; 
                   hidePinPopover(); 
               });
               s.addEventListener('wheel', (e) => {
                   e.preventDefault();
                   adjustZoom(e.deltaY < 0 ? 1.1 : 0.9);
               }, { passive: false });
               s.addEventListener('touchstart', (e) => { 
                   hidePinPopover(); 
                   if (e.touches.length === 1) { 
                       isPanning = true; 
                       lastTouchX = e.touches[0].clientX; 
                       lastTouchY = e.touches[0].clientY; 
                   } else if (e.touches.length === 2) { 
                       isPanning = false; 
                       lastTouchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); 
                   } 
               }, { passive: false });
               s.addEventListener('touchmove', (e) => { 
                   e.preventDefault(); 
                   if (e.touches.length === 1 && isPanning) { 
                       panX += (e.touches[0].clientX - lastTouchX); 
                       panY += (e.touches[0].clientY - lastTouchY); 
                       lastTouchX = e.touches[0].clientX; 
                       lastTouchY = e.touches[0].clientY; 
                       updateViewBox(); 
                   } else if (e.touches.length === 2) { 
                       const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); 
                       if (lastTouchDist > 0) adjustZoom(d / lastTouchDist); 
                       lastTouchDist = d; 
                   } 
               }, { passive: false });
               s.addEventListener('touchend', () => { 
                   isPanning = false; 
                   lastTouchDist = 0; 
               });
           }
           lucide.createIcons();
       };
 
       // --- FUNCIONES DEL MAPA DE PROGRESO ---
       function openProgressMap() {
           const grid = document.getElementById('elementGrid');
           if (!grid || rawData.length === 0) return;
           grid.innerHTML = '';
           
           // 1. Identificar todos los elementos únicos presentes en el informe
           const allElements = new Set();
           rawData.forEach(row => {
               if (row.de_elemento) allElements.add(row.de_elemento);
               if (row.para_elemento) allElements.add(row.para_elemento);
           });
 
           const sortedElements = Array.from(allElements).sort();
 
           sortedElements.forEach(elName => {
               const s = elName.toLowerCase();
               const relatedRows = rawData.filter(row => 
                   (row.de_elemento || '').toLowerCase() === s || 
                   (row.para_elemento || '').toLowerCase() === s
               );
               
               // 2. Contar cables únicos (usando un Set por ID de posición)
               const uniqueCableIds = new Set(relatedRows.map(r => r.posicion));
               const totalCount = uniqueCableIds.size;
               
               // 3. Contar cuántos de esos cables únicos están terminados para este elemento
               let completedCount = 0;
               uniqueCableIds.forEach(pos => {
                   const row = rawData.find(r => r.posicion === pos);
                   const prog = progressMap[pos] || { de: false, para: false };
                   
                   // Lógica específica para puente: si es origen y destino, ambos lados OK
                   const esOrigen = (row.de_elemento || '').toLowerCase() === s;
                   const esDestino = (row.para_elemento || '').toLowerCase() === s;
                   
                   if (esOrigen && esDestino) {
                       if (prog.de && prog.para) completedCount++;
                   } else if (esOrigen) {
                       if (prog.de) completedCount++;
                   } else if (esDestino) {
                       if (prog.para) completedCount++;
                   }
               });
 
               // 4. Calcular estado visual
               const isFinished = totalCount > 0 && completedCount >= totalCount;
               const isInProgress = completedCount > 0 && completedCount < totalCount;
               
               let cardClass = isFinished ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-white' : 
                               (isInProgress ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-300 text-purple-700 dark:text-purple-200' : 
                               'bg-white dark:bg-slate-800 border-sap-border text-sap-text dark:text-slate-300');
               
               let statusText = isFinished ? 'Terminado' : (isInProgress ? 'En curso' : 'Pendiente');
               
               const card = document.createElement('div');
               card.className = `p-3 rounded-lg border text-center transition-all duration-300 cursor-pointer ${cardClass}`;
               
               card.innerHTML = `
                   <div class="text-[8px] font-black uppercase tracking-tighter opacity-80">
                       ${statusText} ${isInProgress ? `(${completedCount}/${totalCount})` : ''}
                   </div>
                   <div class="font-bold text-xs truncate">${elName.toUpperCase()}</div>
               `;
               
               card.onclick = () => { applyTableFilter(elName); closeProgressMap(); };
               grid.appendChild(card);
           });
 
           document.getElementById('progressMapModal').classList.remove('hidden');
           if (window.lucide) lucide.createIcons();
       }
 
       function closeProgressMap() {
           document.getElementById('progressMapModal').classList.add('hidden');
       }
        function openGraphicalViewFromVision() {
   // 1. Cerramos el modo visión
   document.getElementById('detailModal').classList.add('hidden');
   // 2. Ejecutamos la apertura del gráfico usando el elemento actual que está en el título
   const currentEl = document.getElementById('detailElementName').innerText;
   filterText = currentEl; // Actualizamos el filtro para que el gráfico sepa qué mostrar
   openGraphicalView();
}
 
   // Cerrar dropdowns de incidencias, ajustes y columnas al hacer clic fuera
   document.addEventListener('click', function(e) {
       // Dropdown navbar principal
       const container = document.getElementById('incidenciasMenuContainer');
       const dd = document.getElementById('incidenciasDropdown');
       if (container && dd && !container.contains(e.target) && !dd.classList.contains('hidden')) {
           dd.classList.add('hidden');
           document.getElementById('btnIncidencias')?.classList.remove('bg-red-500/10');
       }
       // Dropdown modo visión
       const vContainer = document.getElementById('visionIncidenciasMenuContainer');
       const vDd = document.getElementById('visionIncidenciasDropdown');
       if (vContainer && vDd && !vContainer.contains(e.target) && !vDd.classList.contains('hidden')) {
           vDd.classList.add('hidden');
           document.getElementById('btnVisionIncidencias')?.classList.remove('bg-red-500/80');
       }
       // Dropdown vista móvil
       const mvContainer = document.getElementById('mobileViewMenuContainer');
       const mvDd = document.getElementById('mobileViewDropdown');
       if (mvContainer && mvDd && !mvContainer.contains(e.target) && !mvDd.classList.contains('hidden')) {
           mvDd.classList.add('hidden');
       }
       // Dropdown menú de ajustes (Corregido con doble validación)
       const settingsBtn = document.getElementById('btnSettings');
       const settingsDd = document.getElementById('settingsDropdown');
       if (settingsBtn && settingsDd && !settingsBtn.contains(e.target) && !settingsDd.contains(e.target) && !settingsDd.classList.contains('hidden')) {
           settingsDd.classList.add('hidden');
       }
       // Dropdown personalizar columnas - MEJORADO
       const columnsBtn = document.getElementById('btnColumns');
       const columnsDd = document.getElementById('colConfigDropdown');
       if (columnsDd && !columnsDd.classList.contains('hidden')) {
           // Si el click NO está dentro del botón NI dentro del dropdown, lo cerramos
           if (!columnsBtn?.contains(e.target) && !columnsDd.contains(e.target)) {
               columnsDd.classList.add('hidden');
           }
       }
      }, true);
    window.addEventListener('beforeunload', function (e) {
   if (hasUnsavedChanges) {
       e.preventDefault();
       e.returnValue = '';
   }
});
 
