const msg_es = {
  es: {
    words: {
      da: 'del',
      a: 'al',
    },
    home: {
      guida: 'Guía',
      guida_passopasso: 'Guía paso a paso',
    },
    grid: {
      editvalues: 'Cambiar valores',
      addrecord: 'Agregar fila',
      showprevedit: 'Mostrar eventos pasados',
      nodata: 'Sin datos',
      columns: 'Columnas',
      tableslist: 'Tablas',
    },
    otherpages: {
      sito_offline: 'Sitio en actualización',
      modifprof: 'Editar Perfil',
      biografia: 'Biografia',
      error404: 'error404',
      error404def: 'error404def',
      admin: {
        menu: 'Administración',
        eventlist: 'Sus Reservas',
        usereventlist: 'Reserva Usuarios',
        userlist: 'Lista de usuarios',
        tableslist: 'Listado de tablas',
        navi: 'Naves',
        newsletter: 'Newsletter',
        pages: 'Páginas',
        media: 'Medios',
      },
      manage: {
        menu: 'Gestionar',
        manager: 'Gerente',
        nessuno: 'Nadie',
      },
      messages: {
        menu: 'Tus mensajes',
      },
    },
    sendmsg: {
      write: 'escribe',
    },
    stat: {
      imbarcati: 'Embarcados',
      imbarcati_weekly: 'Embarcados Semanal',
      imbarcati_in_attesa: 'Embarcados en Espera',
      qualificati: 'Calificado con al menos 2 invitados',
      requisiti: 'Los usuarios con los 7 requisitos',
      zoom: 'Participó en Zoom',
      modalita_pagamento: 'Métodos de pago insertados',
      accepted: 'Guías aceptadas + Video',
      dream: 'Escribieron el Sueño',
      email_not_verif: 'Correo electrónico no verificado',
      telegram_non_attivi: 'Telegrama no activo',
      telegram_pendenti: 'Telegram Pendientes',
      reg_daily: 'Registros diarios',
      reg_weekly: 'Registros Semanales',
      reg_total: 'Total de registros',
    },
    steps: {
      nuovo_imbarco: 'Reserva otro viaje',
      vuoi_entrare_nuova_nave: '¿Desea ayudar al Movimiento a avanzar y tiene la intención de entrar en otra nave?<br>Haciendo un nuevo regalo de 33 euros, podrá hacer otro viaje y tener otra oportunidad de convertirse en un Soñador!<br>'
      + 'Si lo confirma, se le añadirá a la lista de espera para el próximo embarque.',
      vuoi_cancellare_imbarco: '¿Está seguro de que quiere cancelar el embarque en el barco de AYNI?',
      completed: 'Completado',
      passi_su: '{passo} pasos de cada {totpassi}',
      video_intro_1: '1. Bienvenido a {sitename}',
      video_intro_2: '2. Nacimiento de {sitename}',
      read_guidelines: 'He leído y estoy de acuerdo con estos términos escritos anteriormente',
      saw_video_intro: 'Declaro que he visto los vídeos',
      paymenttype: 'Métodos de pago', //  (Obligatorio Paypal)
      paymenttype_long: 'Elija <strong>al menos 2 métodos de pago</strong>, para intercambiar regalos.<br><br>Los <strong>métodos de pago son: <ul><li><strong>Revolut</strong>:</li><li><strong>Payeer</strong></li><li><strong>Paypal</strong></li></ul>',
      paymenttype_paypal: 'Cómo abrir una cuenta de Paypal (en 2 minutos)',
      paymenttype_paypal_carta_conto: 'Cómo asociar una tarjeta de crédito/débito o una cuenta bancaria en PayPal',
      paymenttype_paypal_link: 'Abrir una cuenta con Paypal',
      paymenttype_revolut: 'Cómo abrir la cuenta con Revolut (en 2 minutos)',
      paymenttype_revolut_link: 'Abrir cuenta con Revolución',
      entra_zoom: 'Enter Zoom',
      linee_guida: 'Acepto las directrices',
      video_intro: 'Veo los videos',
      zoom: 'Hacer 1 zoom de bienvenida<br>(mira la home para fechas)',
      zoom_si_partecipato: 'Vous avez participé à au moins 1 Zoom',
      zoom_gia_partecipato: 'Hai gia partecipato alla Video-Conferenza di Benvenuto',
      zoom_partecipa: 'Participó al menos 1 Zoom',
      zoom_no_partecipato: 'Aún no ha participado en un Zoom (es un requisito para entrar)',
      zoom_long: 'Se requiere que participe en al menos 1 Zoom, pero se recomienda participar en el movimiento de una manera más activa.<br><br><strong>Al participar en los Zooms el Staff registrará la asistencia y usted estará habilitado.</strong>',
      zoom_what: 'Tutoriales de cómo instalar Zoom Cloud Meeting',
      // sharemovement_devi_invitare_almeno_2: 'Todavía no has invitado a dos personas',
      // sharemovement_hai_invitato: 'Invitaste al menos a dos personas',
      sharemovement_invitati_attivi_si: 'Tienes al menos 2 personas invitadas Activo',
      sharemovement_invitati_attivi_no: '<strong>Nota:</strong>Las personas que invitaste, para ser <strong>Activo</strong>, deben haber <strong>completado todos los primeros 7 Requisitos</strong> (ver tu <strong>Lavagna</strong> para ver lo que les falta)',
      sharemovement: 'Invitar al menos a 2 personas',
      sharemovement_long: 'Continúo trabajando con mis compañeros para llegar al día en que mi barco zarpe.<br>',
      inv_attivi_long: '',
      enter_prog_completa_requisiti: 'Complete todos los requisitos para entrar en la lista de embarque.',
      enter_prog_requisiti_ok: 'Ha completado los 7 requisitos para entrar en la lista de embarque.<br>',
      enter_prog_msg: '¡Recibirá un mensaje en los próximos días tan pronto como su nave esté lista!',
      enter_prog_msg_2: '',
      enter_nave_9req_ok: '¡FELICIDADES! ¡Has completado los 7 pasos de la Guía! ¡Gracias por ayudar a {sitename} a expandirse! <br>Podrás salir muy pronto con tu viaje, haciendo tu regalo y continuando hacia el Soñador.',
      enter_nave_9req_ko: 'Recuerda que puedes ayudar a que el Movimiento crezca y se expanda compartiendo nuestro viaje con todos!',
      enter_prog: 'Voy a entrar en Lista Programación',
      enter_prog_long: 'Si se cumplen los requisitos, entrará en el Programa, se le añadirá al Ticket y al correspondiente chat de grupo.<br>',
      collaborate: 'Colaboración',
      collaborate_long: 'Sigo trabajando con mis compañeros para llegar al día de la programación donde mi boleto será activado.',
      dream: 'Escribo mi sueño',
      dream_long: 'Escribe aquí el sueño por el que entraste en {sitename} y que deseas realizar. ¡Será compartido con todos los demás para soñar juntos!',
      dono: 'Regalo',
      dono_long: 'Hago mi regalo en la fecha de salida de mi nave',
      support: 'Apoyo el movimiento',
      support_long: 'Apoyo el movimiento aportando energía, participando y organizando Zoom, ayudando e informando a los recién llegados y continuando difundiendo la visión de {sitename}.',
      ricevo_dono: 'Recibo mi regalo y CELEBRO',
      ricevo_dono_long: '¡Hurra! <br> <fuerte> ¡Este movimiento es real y posible si lo hacemos funcionar todos juntos!',
    },
    dialog: {
      continue: 'Continuar',
      close: 'Cerrar',
      copyclipboard: 'Copiado al portapapeles',
      ok: 'Vale',
      yes: 'Sí',
      no: 'No',
      delete: 'Borrar',
      cancel: 'Cancelar',
      update: 'Actualiza',
      add: 'Aggrega',
      today: 'Hoy',
      book: 'Reserva',
      avanti: 'Adelante',
      indietro: 'Regresar',
      finish: 'Final',
      sendmsg: 'Envia Mensaje',
      sendonlymsg: 'Envia solo Mensaje',
      msg: {
        titledeleteTask: 'Borrar Tarea',
        deleteTask: 'Quieres borrar {mytodo}?',
      },
    },
    comp: {
      Conta: 'Conta',
    },
    db: {
      recupdated: 'Registro Actualizado',
      recfailed: 'Error durante el registro de actualización',
      reccanceled: 'Actualización cancelada Restaurar valor anterior',
      deleterecord: 'Eliminar registro',
      deletetherecord: '¿Eliminar el registro',
      deletedrecord: 'Registro cancelado',
      recdelfailed: 'Error durante la eliminación del registro',
      duplicatedrecord: 'Registro Duplicado',
      recdupfailed: 'Error durante la duplicación de registros',
    },
    components: {
      authentication: {
        telegram: {
          open: 'Haga clic aquí para abrir el BOT Telegram y siga las instrucciones.',
          ifclose: 'Si no abre el Telegrama haciendo clic en el botón o lo ha borrado, vaya a Telegrama y busque "{botname}" en el icono de la lente, luego presione Start y siga las instrucciones.',
          openbot: 'Abres BOT Telegram',
        },
        login: {
          facebook: 'Facebook',
        },
        email_verification: {
          title: 'Crea una cuenta',
          introduce_email: 'ingrese su dirección de correo electrónico',
          email: 'Email',
          invalid_email: 'Tu correo electrónico no es válido',
          verify_email: 'Revisa tu email',
          go_login: 'Vuelve al Login',
          incorrect_input: 'Entrada correcta.',
          link_sent: 'Ahora lea su correo electrónico y confirme el registro',
          reg_ok: 'Registrazione Avvenuta. Esegui il Login inserendo le tue credenziali',
          se_non_ricevo: 'Si no recibes el correo electrónico, intenta comprobar el spam o ponte en contacto con nosotros.',
          title_unsubscribe: 'Anular suscripción al boletín',
          title_unsubscribe_done: 'Suscripción completada con éxito',
        },
      },
    },
    fetch: {
      errore_generico: 'Error genérico',
      errore_server: 'No se puede acceder al Servidor. Inténtalo de nuevo, Gracias',
      error_doppiologin: 'Vuelva a iniciar sesión. Acceso abierto por otro dispositivo.',
    },
    user: {
      notregistered: 'Debe registrarse en el servicio antes de poder almacenar los datos',
      loggati: 'Usuario no ha iniciado sesión',
    },
    templemail: {
      subject: 'Objecto Email',
      testoheadermail: 'Encabezamiento Email',
      content: 'Contenido',
      img: 'Imagen 1',
      img2: 'Imagen 2',
      content2: 'Contenuto 2',
      options: 'Opciones',
    },
    dashboard: {
      data: 'Fecha',
      data_rich: 'Fecha Pedido',
      ritorno: 'Regreso',
      invitante: 'Invitando',
      num_tessitura: 'Numero di Tessitura:',
      attenzione: 'Atención',
      downline: 'Invitados',
      downnotreg: 'Invitados no Registrados',
      notreg: 'No Registrado',
      inv_attivi: 'Invitado con los 5 requisitos',
      numinvitati: 'Al menos 2 invitados',
      telefono_wa: 'Contacto en Whatsapp',
      sendnotification: 'Enviar notificación al destinatario del telegrama BOT',
      ricevuto_dono: '😍🎊 Usted recibió una invitación de regalo de {invitato} de {mittente} !',
      ricevuto_dono_invitante: '😍🎊 Usted recibió un invitando como regalo de {mittente}  !',
      nessun_invitante: 'No invitando',
      nessun_invitato: 'No invitado',
      legenda_title: 'Haga clic en el nombre del huésped para ver el estado de sus requisitos',
      nave_in_partenza: 'que Sale el',
      nave_in_chiusura: 'Cierre Gift Chat',
      nave_partita: 'partió en',
      tutor: 'Tutor',
      Editor: 'Editor',
      /* Cuando te conviertes en Mediador vienes contactado por un <strong>TUTOR</strong>, con él debes:<br><ol class="lista">' +
      '<li>Abrir tu <strong>Gift Chat</strong> (tu como propietario, y el Tutor ' +
      'como administrador) con este nombre:<br><strong>{nomenave}</strong></li>' +
      '<li>Haz clic en tu nombre en la chat en la parte de arriba-> Modifica -> Administradores -> "Agregar Administrador", selecciona el Tutor en el elenco.</li>' +
      '<li>Debes configurar la chat en modo que quien entre vea también los post precedentes (haz clic en el nombre en la chat arriba, haz clic en modificar, ' +
      'cambia la "cronología para los nuevos miembros" de oculto a visible.</li>' +
      '<li>Para encontrar el <strong>link de la Chat recién creada</strong>: haz clic en el nombre de la chat en la parte de arriba, haz clic sobre el Lápiz-> "Tipo de Grupo" -> "invita al grupo tràmite link", haz clic en "copiar link" y pégalo aquí abajo, sobre la casilla <strong>"Link Gift Chat"</strong></li>' +
      '<li>Envía el Link de la Gift Chat a todos los Donadores, haciendo clic en el botón aquí abajo.</li></ol>',
      */

      sonomediatore: 'Cuando seas un MEDIADOR serás contactado por <strong>TUTOR AYNI</strong> a través de un mensaje en el Chat <strong>AYNI BOT</strong>.',
      superchat: 'Nota: SOLO si tienes problemas de PAGO, o si quieres ser REEMPLAZADO, dos Tutores están esperando para ayudarte en el Chat:<br><a href="{link_superchat}" target="_blank">Entrar en el Chat de Regalos</a>.',
      sonodonatore: '<ol class="lista"><li>Cuando estás en esta posición, vendrás invitado (desde un mensaje en el Chat AYNI BOT) para hacer tu regalo. </li>'
      + '<li> Tendrás <strong>3 días</strong> para hacer tu regalo, en la modalidad de pago que encontrarás escrita en el mensaje. <br></ol>',
      sonodonatore_seconda_tessitura: '<ol class="lista"><li>Aqui tu eres Mediador y también Donador, pero siendo tu segundo Tejido, no será necesario efectuar nuevamente tu regalo<br></ol>',
      controlla_donatori: 'Revise la lista de donantes',
      link_chat: 'Enlaces del Gift Chat Telegram',
      tragitto: 'Ruta',
      nave: 'Nave',
      data_partenza: 'Fecha<br>Salida',
      doni_inviati: 'Regalos<br>enviados',
      nome_dei_passaggi: 'Nombre de los pasajes',
      donatori: 'Donantes',
      donatore: 'Donante',
      mediatore: 'Mediador',
      sognatore: 'Soñador',
      sognatori: 'SOÑADOR',
      intermedio: 'INTERMEDIO',
      pos2: 'Interm. 2',
      pos3: 'Interm. 3',
      pos5: 'Interm. 5',
      pos6: 'Interm. 6',
      gift_chat: 'Para entrar en el Gift Chat, haz clic aquí',
      quando_eff_il_tuo_dono: 'Cuándo hacer el regalo',
      entra_in_gift_chat: 'Entra en el Gift Chat',
      invia_link_chat: 'Enviar enlace de chat de regalos a los donantes',
      inviare_msg_donatori: '5) Enviar mensaje a los donantes',
      msg_donatori_ok: 'Enviado mensaje a los donantes',
      metodi_disponibili: 'Métodos disponibles',
      importo: 'Cantidad',
      effettua_il_dono: 'Es hora de hacer tu regalo al Soñador<br>👉 {sognatore} 👈  !<br>'
      + 'Enviar por medio de <a href="https://www.paypal.com" target="_blank">PayPal</a> a: <strong>{email}</strong><br>'
      + '<strong><span style="color:red">ADVERTENCIA:</span> Elija la opción "ENVIAR A un AMIGO")</strong><br>',
      paypal_me: '<br>2) Método simplificado<br><a href="{link_payment}" target="_blank">Click directamente aquí</a><br>'
      + 'abrirá PayPal con el importe y el destinatario ya establecido.<br>'
      + 'Añadir como mensaje: <strong>Regalo</strong><br>'
      + '<strong><span style="color:red">ADVERTENCIA:</span> NO MARCAR LA CAJA</fuerte>: Protección de compras por Paypal<br>'
      + 'Si tienes alguna duda, mira el video de abajo para ver cómo:<br>'
      + 'Por último, haga clic en "Enviar dinero ahora"',
      qui_compariranno_le_info: 'El día de la salida de la nave, la información del Soñador aparecerá',
      commento_al_sognatore: 'Escribe aquí un comentario para el Soñador:',
      posizione: 'Position',
      come_inviare_regalo_con_paypal: 'Cómo enviar el regalo a través de Paypal',
      ho_effettuato_il_dono: 'He realizado el Regalo',
      clicca_conferma_dono: 'Haz clic aquí para confirmar que has hecho tu regalo',
      fatto_dono: 'Ha confirmado que el regalo ha sido enviado',
      confermi_dono: 'Confirme que ha enviado su regalo de 33 €',
      dono_ricevuto: 'Tu regalo ha sido recibido!',
      dono_ricevuto_2: 'Recibido',
      dono_ricevuto_3: 'Ha llegado!',
      confermi_dono_ricevuto: 'Confirme que ha recibido el regalo de 33 € de {donatore}',
      confermi_dono_ricevuto_msg: 'Confermado que ha recibido el regalo de 33 € de {donatore}',
      msg_bot_conferma: '{donatore} ha confirmado que ha enviado su regalo de 33€ a {sognatore} (Commento: {commento})',
      ricevuto_dono_ok: 'Ha confirmado que el regalo ha sido recibido',
      entra_in_lavagna: 'Entra en tu tablero para ver los barcos que salen',
      doni_ricevuti: 'Regalos recibidos',
      doni_inviati_da_confermare: 'Regalos enviados (a confirmar)',
      doni_mancanti: 'Regalos que faltan',
      temporanea: 'Temporal',
      nave_provvisoria: 'Se le ha asignado un <strong>NAVE TEMPORAL</strong>.<br>Es normal que vea un cambio en la fecha de salida, debido a la actualización del ranking de pasajeros.',
      ritessitura: 'RETEJIDA',
    },
    reg: {
      volta: 'vez',
      volte: 'veces',
      registered: 'Registrado',
      contacted: 'Contacto',
      name_complete: 'Nombre Completo',
      num_invitati: 'Num.Invitados',
      is_in_whatsapp: 'En Whatsapp',
      is_in_telegram: 'En Telegram',
      cell_complete: 'Movíl',
      failed: 'Fallido',
      ind_order: 'Num',
      ipaddr: 'IP',
      verified_email: 'Correo electrónico verificado',
      reg_lista_prec: 'Por favor, introduzca el nombre, apellido y número de teléfono móvil que dejó en el pasado cuando se registró en el Chat! <br>De esta manera el sistema le reconocerá y mantendrá la posición de la lista.',
      nuove_registrazioni: 'Si se trata de un NUEVO registro, debe ponerse en contacto con la persona que le ha INVITADO, que le dejará el LINK CORRECTO para hacer el registro bajo él/ella',
      you: 'Tu',
      cancella_invitato: 'Eliminar Invitado',
      regala_invitato: 'Dar Invitado',
      regala_invitante: 'Dar Invitando',
      messaggio_invito: 'Mensaje de invitación',
      messaggio_invito_msg: 'Copie el mensaje que aparece a continuación y compártalo con todos aquellos con los que desee compartir este Movimiento !',
      videointro: 'Video Introduttivo',
      invitato_regalato: 'Invitato Regalado',
      invitante_regalato: 'Invitando Regalato',
      legenda: 'Legenda',
      aportador_solidario: 'Aportador Solidario',
      username_regala_invitato: 'Nombre de usuario del destinatario del regalo',
      aportador_solidario_nome_completo: 'A.S. Nombre',
      aportador_solidario_ind_order: 'A.S.Ind',
      reflink: 'Enlaces para compartir con tus amigos:',
      linkzoom: 'Enlace para ingresar en Zoom',
      page_title: 'Registro',
      made_gift: 'Don',
      note: 'Notas',
      incorso: 'Registro en curso...',
      richiesto: 'Campo requerido',
      email: 'Email',
      intcode_cell: 'Prefijo Int.',
      cell: 'Móvil Telegram',
      cellreg: 'Cellulare con cui ti eri registrato',
      nationality: 'Nacionalidad',
      email_paypal: 'Email Paypal',
      revolut: 'Revolut',
      link_payment: 'Enlaces Paypal Moneybox',
      note_payment: 'Notas adicionales',
      country_pay: 'País del Pagos de destino',
      username_telegram: 'Usuario Telegram',
      telegram: 'Chat Telegram \'{botname}\'',
      teleg_id: 'Telegram ID',
      teleg_auth: 'Código de autorización',
      click_per_copiare: 'Haz click en él para copiarlo al portapapeles',
      copia_messaggio: 'Copiar mensaje',
      teleg_torna_sul_bot: '1) Copiar el código haciendo clic en el botón de arriba<br>2) volver a {botname} haciendo clic en 👇 y pegar (o escribir) el código',
      teleg_checkcode: 'Código Telegram',
      my_dream: 'Mi Sueño',
      saw_and_accepted: 'Condizioni',
      saw_zoom_presentation: 'Ha visto Zoom',
      manage_telegram: 'Gestori Telegram',
      paymenttype: 'Métodos de pago disponibles',
      selected: 'seleccionado',
      select: 'selecciona',
      img: 'File image',
      date_reg: 'Fecha Reg.',
      deleted: 'Cancellato',
      requirement: 'Requisitos',
      perm: 'Permisos',
      username: 'Username (Apodo)',
      username_short: 'Username',
      name: 'Nombre',
      surname: 'Apellido',
      username_login: 'Nombre usuario o email',
      password: 'contraseña',
      repeatPassword: 'Repetir contraseña',
      terms: 'Acepto los términos por la privacidad',
      onlyadult: 'Confirmo que soy mayor de edad',
      submit: 'Registrarse',
      title_verif_reg: 'Verifica registro',
      reg_ok: 'Registro exitoso',
      verificato: 'Verificado',
      non_verificato: 'No Verificado',
      forgetpassword: '¿Olvidaste tu contraseña?',
      modificapassword: 'Cambiar la contraseña',
      err: {
        required: 'se requiere',
        email: 'Debe ser una email válida.',
        errore_generico: 'Por favor, rellene los campos correctamente',
        atleast: 'debe ser al menos largo',
        complexity: 'debe contener al menos 1 minúscula, 1 mayúscula, 1 dígito',
        complexityUser: 'caratteri consentiti: tratteggio (_), meno (-) e il punto (.)',
        notmore: 'no tiene que ser más largo que',
        char: 'caracteres',
        terms: 'Debes aceptar las condiciones, para continuar..',
        email_not_exist: 'El correo electrónico no está presente en el archivo, verifique si es correcto',
        duplicate_email: 'La email ya ha sido registrada',
        user_already_exist: 'El registro con estos datos (nombre, apellido y teléfono móvil) ya se ha llevado a cabo. Para acceder al sitio, haga clic en el botón INICIAR SESIÓN desde la Página de inicio.',
        user_extralist_not_found: 'Usuario en el archivo no encontrado, inserte el nombre, apellido y número de teléfono enviado previamente',
        user_aportador_not_valid: 'Il link di registrazione non sembra risultare valido.',
        duplicate_username: 'El nombre de usuario ya ha sido utilizado',
        username_not_valid: 'Username not valid',
        aportador_not_exist: 'El nombre de usuario de la persona que lo invitó no está presente. Contactanos.',
        aportador_regalare_not_exist: 'Inserire l\'Username della persona che si vuole regalare l\'invitato',
        sameaspassword: 'Las contraseñas deben ser idénticas',
      },
      tips: {
        email: 'inserisci la tua email',
        username: 'username lunga almeno 6 caratteri',
        password: 'deve contenere 1 minuscola, 1 maiuscola e 1 cifra',
        repeatpassword: 'ripetere la password',

      },
    },
    op: {
      qualification: 'Calificación',
      usertelegram: 'Username Telegram',
      disciplines: 'Disciplinas',
      certifications: 'Certificaciones',
      intro: 'Introducción',
      info: 'Biografia',
      webpage: 'Página web',
      days_working: 'Días laborables',
      facebook: 'Página de Facebook',
    },
    login: {
      page_title: 'Login',
      incorso: 'Login en curso',
      enter: 'Entra',
      esci: 'Salir',
      errato: 'Nombre de usuario, correo o contraseña incorrectos. inténtelo de nuevo',
      subaccount: 'Esta cuenta ha sido fusionada con su inicial. Ingresa usando el nombre de usuario (y el correo electrónico) de tu PRIMERA cuenta.',
      completato: 'Login realizado!',
      needlogin: 'Debes iniciar sesión antes de continuar',
    },
    reset: {
      title_reset_pwd: 'Restablece tu contraseña',
      send_reset_pwd: 'Enviar restablecer contraseña',
      incorso: 'Solicitar nueva Email...',
      email_sent: 'Email enviada',
      check_email: 'Revise su correo electrónico, recibirá un mensaje con un enlace para restablecer su contraseña. Este enlace, por razones de seguridad, expirará después de 4 horas.',
      title_update_pwd: 'Actualiza tu contraseña',
      update_password: 'Actualizar contraseña',
    },
    logout: {
      uscito: 'Estás desconectado',
    },
    errors: {
      graphql: {
        undefined: 'no definido',
      },
    },
    showbigmap: 'Mostrar el mapa más grande',
    todo: {
      titleprioritymenu: 'Prioridad:',
      inserttop: 'Ingrese una nueva Tarea arriba',
      insertbottom: 'Ingrese una nueva Tarea abajo',
      edit: 'Descripción Tarea:',
      completed: 'Ultimos Completados',
      usernotdefined: 'Atención, debes iniciar sesión para agregar una Tarea',
      start_date: 'Fecha inicio',
      status: 'Estado',
      completed_at: 'Fecha de finalización',
      expiring_at: 'Fecha de Caducidad',
      phase: 'Fase',
    },
    notification: {
      status: 'Estado',
      ask: 'Activar notificaciones',
      waitingconfirm: 'Confirmar la solicitud de notificación.',
      confirmed: 'Notificaciones activadas!',
      denied: 'Notificaciones deshabilitadas! Ten cuidado, así no verás llegar los mensajes. Rehabilítalos para verlos.',
      titlegranted: 'Notificaciones permitidas habilitadas!',
      statusnot: 'Estado Notificaciones',
      titledenied: 'Notificaciones permitidas deshabilitadas!',
      title_subscribed: 'Suscripción a FreePlanet.app!',
      subscribed: 'Ahora puedes recibir mensajes y notificaciones.',
      newVersionAvailable: 'Actualiza',
    },
    connection: 'Connection',
    proj: {
      newproj: 'Título Projecto',
      newsubproj: 'Título Sub-Projecto',
      insertbottom: 'Añadir nuevo Proyecto',
      longdescr: 'Descripción',
      hoursplanned: 'Horas Estimadas',
      hoursleft: 'Horas Restantes',
      hoursadded: 'Horas Adicional',
      hoursworked: 'Horas Trabajadas',
      begin_development: 'Comienzo desarrollo',
      begin_test: 'Comienzo Prueba',
      progresstask: 'Progresion',
      actualphase: 'Fase Actual',
      hoursweeky_plannedtowork: 'Horarios semanales programados',
      endwork_estimate: 'Fecha estimada de finalización',
      privacyread: 'Quien puede verlo:',
      privacywrite: 'Quien puede modificarlo:',
      totalphases: 'Fases totales',
      themecolor: 'Tema Colores',
      themebgcolor: 'Tema Colores Fondo',
    },
    where: {
      code: 'Id',
      whereicon: 'Icono',
    },
    col: {
      label: 'Etichetta',
      value: 'Valore',
      type: 'Tipo',
    },
    cal: {
      num: 'Número',
      booked: 'Reservado',
      booked_error: 'Reserva fallida. Intenta nuevamente más tarde',
      sendmsg_error: 'Mensaje no enviado Intenta nuevamente más tarde',
      sendmsg_sent: 'Mensaje enviado',
      booking: 'Reserva Evento',
      titlebooking: 'Reserva',
      modifybooking: 'Edita Reserva',
      cancelbooking: 'Cancelar Reserva',
      canceledbooking: 'Reserva Cancelada',
      cancelederrorbooking: 'Cancelación no realizada, intente nuevamente más tarde',
      cancelevent: 'Cancella Evento',
      canceledevent: 'Evento Cancellato',
      cancelederrorevent: 'Cancellazione Evento non effettuata, Riprovare',
      event: 'Evento',
      starttime: 'Inicio',
      nextevent: 'Próximo evento',
      readall: 'Lee todo',
      enddate: 'a',
      endtime: 'fin',
      duration: 'Duración',
      hours: 'Tiempo',
      when: 'Cuando',
      where: 'Donde',
      teacher: 'Dirigido por',
      enterdate: 'Ingresar la fecha',
      details: 'Detalles',
      infoextra: 'Fecha y Hora Extras:',
      alldayevent: 'Todo el dia',
      eventstartdatetime: 'Inicio',
      enterEndDateTime: 'final',
      selnumpeople: 'Partecipantes',
      selnumpeople_short: 'Num',
      msgbooking: 'Mensaje para enviar',
      showpdf: 'Ver PDF',
      bookingtextdefault: 'Reservo para',
      bookingtextdefault_of: 'de',
      data: 'Fecha',
      teachertitle: 'Maestro',
      peoplebooked: 'Reserv.',
      showlastschedule: 'Ver todo el calendario',
    },
    msgs: {
      message: 'Mensaje',
      messages: 'Mensajes',
      nomessage: 'Sin Mensaje',
    },
    event: {
      _id: 'id',
      typol: 'Typology',
      short_tit: 'Título Corto',
      title: 'Título',
      details: 'Detalles',
      bodytext: 'Texto del evento',
      dateTimeStart: 'Fecha de Inicio',
      dateTimeEnd: 'Fecha Final',
      bgcolor: 'Color de fondo',
      days: 'Días',
      icon: 'Icono',
      img: 'Nombre Imagen',
      img_small: 'Imagen Pequeña',
      where: 'Dónde',
      contribtype: 'Tipo de Contribución',
      price: 'Precio',
      askinfo: 'Solicitar información',
      showpage: 'Ver página',
      infoafterprice: 'notas después del precio',
      teacher: 'Profesor', // teacherid
      teacher2: 'Profesor2', // teacherid2
      infoextra: 'InfoExtra',
      linkpage: 'Sitio WEb',
      linkpdf: 'Enlace ad un PDF',
      nobookable: 'No Reservable',
      news: 'Novedad',
      dupId: 'Id Duplicado',
      canceled: 'Cancelado',
      deleted: 'Eliminado',
      duplicate: 'Duplica',
      notempty: 'El campo no puede estar vacío.',
      modified: 'Modificado',
      showinhome: 'Mostrar en la Home',
      showinnewsletter: 'Mostrar en el boletín',
      color: 'Titulo Color',
    },
    disc: {
      typol_code: 'Código Tipologìa',
      order: 'Clasificación',
    },
    newsletter: {
      title: '¿Desea recibir nuestro boletín informativo?',
      name: 'Tu Nombre',
      surname: 'Tu Apellido',
      namehint: 'Nombre',
      surnamehint: 'Apellido',
      email: 'tu correo',
      submit: 'Subscribete',
      reset: 'Reiniciar',
      typesomething: 'Llenar el campo',
      acceptlicense: 'Acepto la licencia y los términos',
      license: 'Necesitas aceptar la licencia y los términos primero',
      submitted: 'Subscrito',
      menu: 'Newsletter1',
      template: 'Plantillas de Email',
      sendemail: 'Enviar',
      check: 'Verificar',
      sent: 'Ya eniado',
      mailinglist: 'Lista de contactos',
      settings: 'Configuración',
      serversettings: 'Servidor',
      others: 'Otro',
      templemail: 'Plantilla de Email',
      datetoSent: 'Fecha y Ora de Envio',
      activate: 'Activado',
      numemail_tot: 'Email Total',
      numemail_sent: 'Email Enviados',
      datestartJob: 'Inicio Envio',
      datefinishJob: 'Fin Envio',
      lastemailsent_Job: 'Ùltimo enviado',
      starting_job: 'Comenzó a enviar',
      finish_job: 'Envio terminado',
      processing_job: 'En curso',
      error_job: 'Info Error',
      statesub: 'Subscribir',
      wrongerr: 'Email invalide',
    },
    privacy_policy: 'Política de privacidad',
    cookies: 'Utilizamos cookies para un mejor rendimiento web.',
    mypages: {
      find_people: 'Busca Personas',
      friends: 'Amigos',
      groups: 'Grupos',
      request_friends: 'Rich. Amicizia',
      request_sent_friends: 'Rich. Inviate',
      request_trust: 'Rich. Fiducia',
      trusted: 'Fiducia Accettata',
      rejected: 'Rifiutati',
    },
    friends: {
      accept_trust: 'Accetta Fiducia',
      accept_friend: 'Accetta Amicizia',
      reject_trust: 'Rifiuta Fiducia',
      remove_from_myfriends: 'Rimuovi dagli Amici',
      block_user: 'Blocca Utente',
      ask_friend: 'Chiedi l\'Amicizia',
      cancel_ask_friend: 'Annulla la richiesta di Amicizia',
      reject_ask_friend: 'Rifiuta la richiesta di Amicizia',
    }  },
};

export default msg_es;
