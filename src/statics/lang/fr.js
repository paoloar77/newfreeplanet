const msg_fr = {
  fr: {
    words: {
      da: 'du',
      a: 'au',
    },
    home: {
      guida: 'Guide',
      guida_passopasso: 'Guide pas-à-pas',
    },
    grid: {
      editvalues: 'Changer les valeurs',
      addrecord: 'Ajouter une ligne',
      showprevedit: 'Afficher les événements passés',
      nodata: 'Pas de données',
      columns: 'Colonnes',
      tableslist: 'Tables',
    },
    otherpages: {
      sito_offline: 'Site en cours de mise à jour',
      modifprof: 'Modifier le profil',
      biografia: 'Biografia',
      error404: 'error404',
      error404def: 'error404def',
      admin: {
        menu: 'Administration',
        eventlist: 'Vos réservations',
        usereventlist: 'Réservation Utilisateur',
        userlist: 'Liste d\'utilisateurs',
        tableslist: 'Liste des tables',
        navi: 'Navires',
        newsletter: 'Newsletter',
        pages: 'Pages',
        media: 'Médias',
      },
      manage: {
        menu: 'Gérer',
        manager: 'Directeur',
        nessuno: 'Aucun',
      },
      messages: {
        menu: 'Vos messages',
      },
    },
    sendmsg: {
      write: 'écrit',
    },
    stat: {
      imbarcati: 'Embarqués',
      imbarcati_weekly: 'Embarqués hebdomadaire',
      imbarcati_in_attesa: 'Embarqués en attente',
      qualificati: 'Qualifié avec au moins 2 invités',
      requisiti: 'Utilisateurs ayant les 7 exigences',
      zoom: 'Participer à Zoom',
      modalita_pagamento: 'Insertion des modes de paiement',
      accepted: 'Lignes directrices acceptées + vidéo',
      dream: 'Ils ont écrit le Rêve',
      email_not_verif: 'Courriel non vérifié',
      telegram_non_attivi: 'Telegram non actif',
      telegram_pendenti: 'Telegram Pendants',
      reg_daily: 'Enregistrements quotidiennes',
      reg_weekly: 'Enregistrements hebdomadaires',
      reg_total: 'Total des enregistrements',
    },
    steps: {
      nuovo_imbarco: 'Réserver un autre voyage',
      vuoi_entrare_nuova_nave: 'Vous souhaitez aider le Mouvement à avancer et avez l\'intention d\'entrer dans un autre navire ?<br>En faisant un nouveau don de 33€, vous pourrez faire un autre voyage et avoir une autre opportunité de devenir un Rêveur !<br>'
      + 'Si vous confirmez, vous serez ajouté à la liste d\'attente pour le prochain embarquement.',
      vuoi_cancellare_imbarco: 'Êtes-vous sûr de vouloir annuler cet embarquement sur le navire AYNI ?',
      completed: 'Complétée',
      passi_su: '{passo} étapes sur {totpassi}',
      video_intro_1: '1. Bienvenue à l\'{sitename}',
      video_intro_2: '2. Naissance de l\'{sitename}',
      read_guidelines: 'J\'ai lu et j\'accepte ces conditions écrites ci-dessus',
      saw_video_intro: 'Je déclare avoir vu la vidéo',
      paymenttype: 'Méthodes de paiement',
      paymenttype_long: 'Choisissez <strong>au moins 2 modes de paiement</strong>, pour échanger des cadeaux.<br><br>Les modes de paiement <strong>sont : <ul><li><strong>Payeer</strong></li><li><strong>Revolut</strong> : la carte prépayée Revolut avec IBAN anglais (hors UE) complètement gratuite, plus gratuite et facile à utiliser. Disponible l\'application pour mobile.</li><li><strong>Paypal MoneyBox</strong>car c\'est un système très populaire dans toute l\'Europe (le transfert est gratuit) et vous pouvez connecter des cartes prépayées, des cartes de crédit et un compte bancaire <strong> SANS COMMISSIONS</strong>. De cette façon, vous n\'aurez pas à partager vos numéros de carte ou de c/c mais seulement l\'email que vous avez utilisé lors de l\'inscription sur Paypal. Disponible l\'application pour votre téléphone portable.</li></ul>',
      paymenttype_paypal: 'Comment ouvrir un compte Paypal (en 2 minutes)Comment ouvrir un compte Paypal (en 2 minutes)',
      paymenttype_paypal_carta_conto: 'Comment associer une carte de crédit/débit ou un compte bancaire sur PayPal',
      paymenttype_paypal_link: 'Ouverture d\'un compte avec Paypal',
      paymenttype_revolut: 'Comment ouvrir un compte chez Revolut (en 2 minutes)',
      paymenttype_revolut_link: 'Ouvrir un compte auprès de Revolut',
      entra_zoom: 'Enter Zoom',
      linee_guida: "J'accepte les lignes directrices",
      video_intro: 'Je vois la vidéo',
      zoom: 'A participé à au moins 1 Zoom',
      zoom_si_partecipato: 'Vous avez participé à au moins 1 Zoom',
      zoom_gia_partecipato: 'Hai gia partecipato alla Video-Conferenza di Benvenuto',
      zoom_partecipa: 'A participé à au moins 1 Zoom',
      zoom_no_partecipato: "Vous n'avez pas encore participé à un Zoom (il est obligatoire d'entrer)",
      zoom_long: 'Vous devez participer à au moins un Zoom, mais il est recommandé de participer au mouvement de manière plus active. <br><br><strong>En participant aux Zooms, le personnel enregistrera votre présence et vous serez activé. </strong>',
      zoom_what: "Tutoriels d'installation de Zoom Cloud Meeting",
      // sharemovement_devi_invitare_almeno_2: 'Vous n\'avez toujours pas invité 2 personnes',
      // sharemovement_hai_invitato: 'Vous avez invité au moins deux personnes',
      sharemovement_invitati_attivi_si: 'Vous avez au moins 2 personnes invitées Active',
      sharemovement_invitati_attivi_no: '<strong>Note:</strong>Les personnes que vous avez invitées, pour être <strong>Actif</strong>, doivent avoir <strong>complété les 7 premières exigences</strong> (voir votre <strong>Lavagna</strong> pour voir ce qu\'il leur manque)',
      sharemovement: 'Invitation au moins 2 personnes',
      sharemovement_long: 'Partagez le mouvement {sitename} et invitez-les à participer aux zooms de bienvenue pour faire partie de cette grande famille &#128516 .<br>.',
      inv_attivi_long: '',
      enter_prog_completa_requisiti: 'Remplissez toutes les conditions pour figurer sur la liste d\'embarquement.',
      enter_prog_requisiti_ok: 'Vous avez rempli les 5 conditions pour figurer sur la liste d\'embarquement.<br>',
      enter_prog_msg: 'Vous recevrez un message dans les prochains jours dès que votre bateau sera prêt !',
      enter_prog_msg_2: '',
      enter_nave_9req_ok: 'FÉLICITATIONS ! Vous avez suivi les 7 étapes du guide ! Merci d\'avoir aidé {sitename} à se développer ! <br> Vous pourrez bientôt partir avec votre Voyage, en faisant votre don et en continuant vers le Rêveur.',
      enter_nave_9req_ko: 'N\'oubliez pas que vous pouvez aider le Mouvement à grandir et à s\'étendre en partageant notre voyage avec tout le monde !',
      enter_prog: 'Je vais dans la Liste des Programmation',
      enter_prog_long: 'Si vous remplissez les conditions requises pour entrer dans le programme, vous serez ajouté au billet et au chat de groupe correspondant<br>',
      collaborate: 'Collaboration',
      collaborate_long: 'Je continue à travailler avec mes compagnons pour arriver au jour où mon navire prendra la mer.',
      dream: 'J\'écris mon rêve',
      dream_long: 'Ecrivez ici le Rêve pour lequel vous êtes entré à {sitename} et que vous souhaitez réaliser.<br>Il sera partagé avec tous les autres pour rêver ensemble !',
      dono: 'Cadeau',
      dono_long: 'Je fais mon cadeau à la date de départ de mon nef',
      support: 'Je soutiens le mouvement',
      support_long: 'Je soutiens le mouvement en apportant de l\'énergie, en participant et en organisant Zoom, en aidant et en informant les nouveaux arrivants et en continuant à diffuser la vision d\'{sitename}.',
      ricevo_dono: 'Je reçois mon cadeau et je CÉLÈBRE',
      ricevo_dono_long: 'Hourra ! !!! <br><strong> CE MOUVEMENT EST RÉEL ET POSSIBLE SI NOUS TRAVAILLONS TOUS ENSEMBLE !',
    },
    dialog: {
      continue: 'Continuer',
      close: 'Fermer',
      copyclipboard: 'Copié dans le presse-papiers',
      ok: 'Bien',
      yes: 'Oui',
      no: 'Non',
      delete: 'Supprimer',
      update: 'mises à jour',
      add: 'Ajouter',
      cancel: 'annuler',
      today: 'Aujourd\'hui',
      book: 'Réserve',
      avanti: 'Allez-y',
      indietro: 'en arrière',
      finish: 'Fin',
      sendmsg: 'envoyer msg',
      sendonlymsg: 'envoyer seul un msg',
      msg: {
        titledeleteTask: 'Supprimer la tâche',
        deleteTask: 'Voulez-vous supprimer {mytodo}?',
      },
    },
    comp: {
      Conta: 'Conta',
    },
    db: {
      recupdated: 'Enregistrement mis à jour',
      recfailed: 'Erreur lors de la mise à jour',
      reccanceled: 'Mise à jour annulée. Restaurer la valeur précédente',
      deleterecord: 'Supprimer l\'enregistrement',
      deletetherecord: 'Supprimer l\'enregistrement',
      deletedrecord: 'Enregistrement annulé',
      recdelfailed: 'Erreur lors de la suppression de l\'enregistrement',
      duplicatedrecord: 'Enregistrement en double',
      recdupfailed: 'Erreur lors de la duplication des enregistrements',
    },
    components: {
      authentication: {
        telegram: {
          open: 'Cliquez ici pour ouvrir le télégramme BOT et suivez les instructions',
          ifclose: 'Si vous n\'ouvrez pas Telegram en cliquant sur le bouton ou si vous l\'avez supprimé, allez à Telegram et cherchez "{botname}" dans l\'icône de l\'objectif, puis appuyez sur Start et suivez les instructions.',
          openbot: 'Ouvre BOT Telegram',
        },
        login: {
          facebook: 'Facebook',
        },
        email_verification: {
          title: 'Créer un compte',
          introduce_email: 'entrez votre adresse email',
          email: 'Email',
          invalid_email: 'Votre email n\'est pas valide',
          verify_email: 'Vérifiez votre email',
          go_login: 'Retour à la connexion',
          incorrect_input: 'Entrée correcte.',
          link_sent: 'Maintenant, lisez votre email et confirmez votre inscription',
          reg_ok: 'Registrazione Avvenuta. Esegui il Login inserendo le tue credenziali',
          se_non_ricevo: 'Si vous ne recevez pas le courriel, essayez de vérifier dans le spam, ou contactez nous',
          title_unsubscribe: 'Se désabonner de la newsletter',
          title_unsubscribe_done: 'Abonnement terminé avec succès',
        },
      },
    },
    fetch: {
      errore_generico: 'Erreur générique',
      errore_server: 'Le serveur n\'est pas accessible. Essayez encore, Merci',
      error_doppiologin: 'Re-connexion Accès ouvert par un autre appareil.',
    },
    user: {
      notregistered: 'Vous devez vous inscrire auprès du service avant de pouvoir stocker les données.',
      loggati: 'L\'utilisateur n\'est pas connecté',
    },
    templemail: {
      subject: 'Objet Email',
      testoheadermail: 'en-tête de courrier électronique',
      content: 'Contenu',
      img: 'Image 1',
      img2: 'Image 2',
      content2: 'Contenu 2',
      options: 'Options',
    },
    dashboard: {
      data: 'Date',
      data_rich: 'Date demandée',
      ritorno: 'Retour',
      invitante: 'Invitation',
      num_tessitura: 'Numero di Tessitura:',
      attenzione: 'Attention',
      downline: 'invités',
      downnotreg: 'Invités non enregistrés',
      notreg: 'Non enregistré',
      inv_attivi: 'Invité avec les 5 exigences',
      numinvitati: 'Au moins 2 invités',
      telefono_wa: 'Contact sur Whatsapp',
      sendnotification: 'Envoyer la notification au destinataire par télégramme BOT',
      ricevuto_dono: '😍🎊 Vous avez reçu une invitation-cadeau de {invitato} de {mittente} !',
      ricevuto_dono_invitante: '😍🎊 Vous avez reçu une invitation-cadeau de {mittente} !',
      nessun_invitante: 'Pas d\'invitation',
      nessun_invitato: 'Non_invité',
      legenda_title: 'Cliquez sur le nom de l\'invité pour voir l\'état de ses besoins',
      nave_in_partenza: 'part le',
      nave_in_chiusura: 'Clôture Gift Chat',
      nave_partita: 'parti sur',
      facilitatore: 'Tuteur',
      /* Quand vous devenez Médiateur vous êtes contacté par un <strong>TUTEUR</strong>, avec lui vous devez:<br><ol class="lista">' +
      '<li>Ouvrir votre <strong>Gift Chat</strong> (vous comme propriétaire et le Tuteur ' +
      'comme administrateur) avec ce nom:<br><strong>{nomenave}</strong></li>' +
      '<li>Cliquez sur le nom du chat en haut -> Modifiez -> Administrateurs -> "Ajoutez Administrateur", sélectionner le Tuteur dans la liste.</li>' +
      '<li>Vous devez configurer le chat de façon que la personne qui entre puisse également voir les post précédents  (cliquez sur le nom du chat en haut, cliquez sur modifiez, ' +
      'changez la "chronologie pour les nouveaux membres" de cachée à visibile.</li>' +
      '<li>Pour trouver le <strong>link du Chat à peine crée</strong>: cliquez sur le nom du chat en haut, cliquez sur le Crayon -> "Type de Groupe" -> "invitez dans le groupe à travers le link", cliquez sur "copiez link" et collez-le ci-dessous, dans la case <strong>"Link Gift Chat"</strong></li>' +
      '<li>Envoyez le Link de la Gift Chat à tous les Donateurs, en cliquant sur le boutton ci-dessous .</li></ol>',
      */
      sonomediatore: 'Lorsque vous êtes un MEDIATEUR, vous serez contacté par <strong>FACILITATORE AYNI</strong> via un message sur le Chat <strong>AYNI BOT</strong>.',
      superchat: 'Note : SEULEMENT si vous avez des problèmes de PAIEMENT, ou si vous voulez être REMPLACÉ, deux tuteurs vous attendent pour vous aider sur le Chat:<br><a href="{link_superchat}" target="_blank">Get into Gift Chat</a>.',
      sonodonatore: '<ol class="lista"><li>Quand vous êtes dans cette position, vous serez invité pour faire votre cadeau</li>'
      + '<li>Vous aurez <strong>3 jours</strong> pour faire votre cadeau.<br></ol>',
      sonodonatore_seconda_tessitura: '<ol class="liste"><li>Ici vous êtes Médiateur et également Donateur, mais étant le deuxième Tissage, vous n’aurez pas besoin d’éffectuer de nouveau votre don<br></ol>',
      controlla_donatori: 'Vérifiez la liste des donateurs',
      link_chat: 'Link de Gift Chat Telegram',
      tragitto: 'Itinéraire',
      nave: 'Navire',
      data_partenza: 'Date<br>de Départ',
      doni_inviati: 'Regalo<br>Envoyés',
      nome_dei_passaggi: 'Nom<br>des passagers',
      donatori: 'Donateurs',
      donatore: 'Donateur',
      mediatore: 'Médiateur',
      sognatore: 'Rêveur',
      sognatori: 'RÊVEURS',
      intermedio: 'INTERMEDIAIRE',
      pos2: 'Interm. 2',
      pos3: 'Interm. 3',
      pos5: 'Interm. 5',
      pos6: 'Interm. 6',
      gift_chat: 'Pour entrer dans le Gift Chat, cliquez ici',
      quando_eff_il_tuo_dono: 'Quand faire le Regalo',
      entra_in_gift_chat: 'Entrez dans le "Gift Chat"',
      invia_link_chat: 'Envoyer le lien du Chat de cadeaux aux donateurs',
      inviare_msg_donatori: '5) Envoyer un message aux donateurs',
      msg_donatori_ok: 'Message envoyé aux donateurs',
      metodi_disponibili: 'Méthodes disponibles',
      importo: 'Montant',
      effettua_il_dono: 'Il est temps de faire votre propre regalo au Rêveur<br>👉 {sognatore} 👈  '
      + 'Envoyez via <a href="https://www.paypal.com" target="_blank">PayPal</a> à : <strong>{email}</strong><br>'
      + '<strong><span style="color:red">ATTENTION:</span> Choisissez l\'option "SENDING TO A FRIEND"</strong><br>',
      paypal_me: '<br>2) Méthode simplifiée<br><a href="{link_payment}" target="_blank">Cliquez directement ici</a><br>'
      + 'ouvrira PayPal avec le montant et le destinataire déjà définis.<br>'
      + 'Ajouter comme message : <strong>Regalo</strong><br>'
      + '<strong><span style="color:red">WARNING:</span> NE COCHEZ PAS LA BOITE</strong> : Protection des achats par Paypal<br>'
      + 'Si vous avez des doutes, regardez la vidéo ci-dessous pour voir comment:<br>'
      + 'Enfin, cliquez sur "Envoyer de l\'argent maintenant"',
      qui_compariranno_le_info: 'Le jour du départ du navire, les informations du Dreamer apparaîtront',
      commento_al_sognatore: 'Ecrivez ici un commentaire pour le Rêveur:',
      posizione: 'Localisation',
      come_inviare_regalo_con_paypal: 'Comment envoyer le regalo via Paypal',
      ho_effettuato_il_dono: 'J\'ai effectué le Regalo',
      clicca_conferma_dono: 'Cliquez ici pour confirmer que vous avez fait votre regalo',
      fatto_dono: 'Vous avez confirmé que le Regalo a été envoyé',
      confermi_dono: 'Confirmez que vous avez envoyé votre Regalo de 33€',
      dono_ricevuto: 'Votre regalo a été reçu!',
      dono_ricevuto_2: 'Reçu',
      dono_ricevuto_3: 'Arrivé!',
      confermi_dono_ricevuto: 'Confirmez que vous avez reçu le regalo de 33 $ de {donatore}',
      confermi_dono_ricevuto_msg: 'Confirme la réception du regalo de 33€ de {donatore}',
      msg_bot_conferma: '{donatore} a confirmé qu\'il avait envoyé son cadeau de 33 € a {sognatore} (Commento: {commento})',
      ricevuto_dono_ok: 'Vous avez confirmé que le cadeau a été reçu',
      entra_in_lavagna: 'Montez sur votre tableau noir pour voir les navires au départ',
      doni_ricevuti: 'Regalo reçus',
      doni_inviati_da_confermare: 'Regalo envoyés (à confirmer)',
      doni_mancanti: 'Regalo manquants',
      temporanea: 'Temporaire',
      nave_provvisoria: 'On vous a attribué une <strong>NAVE TEMPORAIRE</strong>.<br>Il est normal que vous constatiez un changement de date de départ, en raison de la mise à jour du classement des passagers.',
      ritessitura: 'ÉCRITURE',
    },
    reg: {
      volta: 'fois',
      volte: 'fois',
      registered: 'Registrato',
      contacted: 'Contattato',
      name_complete: 'Nome Completo',
      num_invitati: 'Num.Invitati',
      is_in_whatsapp: 'In Whatsapp',
      is_in_telegram: 'In Telegram',
      cell_complete: 'Cellulare',
      failed: 'Fallito',
      ind_order: 'Num',
      ipaddr: 'IP',
      verified_email: 'Email Verified',
      reg_lista_prec: 'Veuillez entrer le prénom, le nom et le numéro de téléphone portable que vous avez laissé lors de votre inscription à la Chat ! <br>De cette façon, le système vous reconnaîtra et conservera la position de la liste',
      new_registrations: "S'il s'agit d'une NOUVELLE inscription, vous devez contacter la personne qui vous a INVITÉE, qui vous laissera le LIEN CORRECT pour effectuer l'inscription sous sa responsabilité",
      you: 'Vous',
      cancella_invitato: 'Supprimer invité',
      regala_invitato: 'Invited_gift',
      regala_invitante: 'présente invitant',
      messaggio_invito: "Message d'invitation",
      messaggio_invito_msg: 'Envoyez ce message à tous ceux à qui vous voulez partager ce Mouvement !',
      videointro: "Vidéo d'introduction",
      invitato_regalato: 'Cadeau invité',
      invitante_regalato: 'Cadeau Invitè',
      legenda: 'Légende',
      aportador_solidario: 'Qui vous a invité',
      username_regala_invitato: 'Nom d\'utilisateur du destinataire du cadeau',
      aportador_solidario_nome_completo: 'A.S. Nom',
      aportador_solidario_ind_order: 'A.S.Ind',
      reflink: 'Des liens à partager avec vos invités :',
      linkzoom: 'Lien pour entrer en Zoom',
      made_gift: 'Doné',
      note: 'Notes',
      incorso: 'Registrazione in corso...',
      richiesto: 'Champ obligatoire',
      email: 'Email',
      intcode_cell: 'Préfixe int.',
      cell: 'Téléphone Telegram',
      cellreg: 'Cellulare con cui ti eri registrato',
      nationality: 'Nationalité',
      email_paypal: 'Email Paypal',
      payeer_id: 'Id Payeer',
      advcash_id: 'Email Advanced Cash',
      revolut: 'Revolut',
      link_payment: 'Liens Paypal MoneyBox',
      note_payment: 'Notes complémentaires',
      country_pay: 'Pays de destination Paiements',
      username_telegram: 'Nom d\'utilisateur du Telegram',
      telegram: 'Chat Telegram \'{botname}\'',
      teleg_id: 'Telegram ID',
      teleg_auth: 'Code d\'autorisation',
      click_per_copiare: 'Cliquez dessus pour le copier dans le presse-papiers',
      copia_messaggio: 'Copier le message',
      teleg_torna_sul_bot: '1) Copiez le code en cliquant sur le bouton ci-dessus<br>2) retournez à {botname} en cliquant sur 👇 et collez (ou écrivez) le code',
      teleg_checkcode: 'Code du Telegram',
      my_dream: 'Mon rêve',
      saw_and_accepted: 'Condizioni',
      saw_zoom_presentation: 'Ha visto Zoom',
      manage_telegram: 'Gestori Telegram',
      paymenttype: 'Méthodes de paiement disponibles',
      selected: 'sélectionné',
      select: 'sélectionnez',
      img: 'Fichier image',
      date_reg: 'Date Inscript.',
      requirement: 'Exigences',
      perm: 'Autorisations',
      username: 'Username (Surnom)',
      username_short: 'Username',
      name: 'Nom',
      surname: 'Prénom',
      username_login: 'Nom d\'utilisateur ou email',
      password: 'mot de passe',
      repeatPassword: 'Répéter le mot de passe',
      terms: "J'accepte les conditions de confidentialité",
      onlyadult: 'Je confirme que je suis majeur',
      submit: "S'inscrire",
      title_verif_reg: "Vérifier l'inscription",
      reg_ok: 'Enregistrement réussi',
      verificato: 'Vérifié',
      non_verificato: 'Non vérifié',
      forgetpassword: 'Vous avez oublié votre mot de passe?',
      modificapassword: 'Changer le mot de passe',
      err: {
        required: 'c\'est nécessaire',
        email: 'Ce doit être un email valide.',
        errore_generico: 'S\'il vous plaît remplir les champs correctement',
        atleast: 'ça doit être au moins long',
        complexity: 'doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre',
        complexityUser: 'caratteri consentiti: tratteggio (_), meno (-) e il punto (.)',
        notmore: 'il ne doit pas être plus long que',
        char: 'caractères',
        terms: 'Vous devez accepter les conditions, pour continuer..',
        email_not_exist: 'L\'email n\'est pas présent dans l\'archive, vérifiez s\'il est correct',
        duplicate_email: 'L\'email a déjà été enregistré',
        user_already_exist: 'L\'enregistrement avec ces données (nom, prénom et téléphone portable) a déjà été effectué. Pour accéder au site, cliquez sur le bouton CONNEXION de la page d\'accueil.',
        user_extralist_not_found: 'Utilisateur dans les archives introuvable, insérez le nom, le prénom et le numéro de téléphone portable envoyés précédemment',
        user_aportador_not_valid: 'Il link di registrazione non sembra risultare valido.',
        duplicate_username: 'Le nom d\'utilisateur a déjà été utilisé',
        username_not_valid: 'Username not valid',
        aportador_not_exist: 'Le nom d\'utilisateur de la personne qui vous a invité n\'est pas présent. Contactez-nous.',
        aportador_regalare_not_exist: 'Inserire l\'Username della persona che si vuole regalare l\'invitato',
        sameaspassword: 'Les mots de passe doivent être identiques',
      },
      tips: {
        email: 'inserisci la tua email',
        username: 'username lunga almeno 6 caratteri',
        password: 'deve contenere 1 minuscola, 1 maiuscola e 1 cifra',
        repeatpassword: 'ripetere la password',
      },
    },
    op: {
      qualification: 'Qualification',
      usertelegram: 'Username Telegram',
      disciplines: 'Disciplines',
      certifications: 'Certifications',
      intro: 'Introduction',
      info: 'Biographie',
      webpage: 'Page Web',
      days_working: 'Jours ouvrés',
      facebook: 'Page Facebook',
    },
    login: {
      page_title: 'Login',
      incorso: 'Connexion en cours',
      enter: 'Entrez',
      esci: 'Sortir',
      errato: "Nom d'utilisateur, email ou mot de passe incorrect. réessayer",
      subaccount: "Ce compte a été fusionné avec votre compte initial. Connectez-vous en utilisant le nom d'utilisateur (et l'adresse électronique) du compte FIRST.",
      completato: 'Connexion faite!',
      needlogin: 'Vous devez vous connecter avant de continuer',
    },
    reset: {
      title_reset_pwd: 'Réinitialiser votre mot de passe',
      send_reset_pwd: 'Envoyer un mot de passe de réinitialisation',
      incorso: 'Demander un nouvel email...',
      email_sent: 'Email envoyé',
      token_scaduto: 'Il token è scaduto oppure è stato già usato. Ripetere la procedura di reset password',
      check_email: 'Vérifiez votre email, vous recevrez un message avec un lien pour réinitialiser votre mot de passe. Ce lien, pour des raisons de sécurité, expirera au bout de 4 heures.',
      title_update_pwd: 'Mettez à jour votre mot de passe',
      update_password: 'Mettre à jour le mot de passe',
    },
    logout: {
      uscito: 'Vous êtes déconnecté',
    },
    errors: {
      graphql: {
        undefined: 'non défini',
      },
    },
    showbigmap: 'Montrer la plus grande carte',
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
      status: 'Etat',
      ask: 'Activer les notifications',
      waitingconfirm: 'Confirmer la demande de notification.',
      confirmed: 'Notifications activées!',
      denied: 'Notifications désactivées! Attention, vous ne verrez pas les messages arriver. Réhabilitez-les pour les voir.',
      titlegranted: 'Notifications activées activées!',
      statusnot: 'Notifications d\'état',
      titledenied: 'Notifications autorisées désactivées!',
      title_subscribed: 'Abonnement au Site Web!',
      subscribed: 'Maintenant, vous pouvez recevoir des messages et des notifications.',
      newVersionAvailable: 'Mise à jour',
    },
    connection: 'Connexion',
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
      whereicon: 'icône',
    },
    col: {
      label: 'Etichetta',
      value: 'Valore',
      type: 'Tipo',
    },
    cal: {
      num: 'Nombre',
      booked: 'Réservé',
      booked_error: 'La réservation a échoué. Réessayez plus tard',
      sendmsg_error: 'Message non envoyé. Réessayez plus tard',
      sendmsg_sent: 'Message envoyé',
      sendmsgs_sent: 'Messages envoyé',
      sendmsg_sent_sharedlink: 'Il Messaggio da inviare lo trovi nella Chat Telegram',
      booking: 'Réserver l\'événement',
      titlebooking: 'Réservation',
      modifybooking: 'changement de réservation',
      cancelbooking: 'Annuler la réservation',
      canceledbooking: 'Réservation annulée',
      cancelederrorbooking: 'Annulation non effectuée, réessayez plus tard',
      cancelevent: 'Cancella Evento',
      canceledevent: 'Evento Cancellato',
      cancelederrorevent: 'Cancellazione Evento non effettuata, Riprovare',
      event: 'événement',
      starttime: 'Accueil',
      nextevent: 'Prochain événement',
      readall: 'Tout lire',
      enddate: 'au',
      endtime: 'fin',
      duration: 'Durée',
      hours: 'Le temps',
      when: 'Quand',
      where: 'Où',
      teacher: 'Dirigé par',
      enterdate: 'Entrez la date',
      details: 'Les détails',
      infoextra: 'Extras Date et heure:',
      alldayevent: 'Toute la journée',
      eventstartdatetime: 'début',
      enterEndDateTime: 'final',
      selnumpeople: 'Participants',
      selnumpeople_short: 'Num',
      msgbooking: 'Message à envoyer',
      showpdf: 'Voir PDF',
      bookingtextdefault: 'Je réserve',
      bookingtextdefault_of: 'du',
      data: 'Date',
      teachertitle: 'Professeur',
      peoplebooked: 'Réserv.',
      showlastschedule: 'Voir tout le calendrier',
    },
    msgs: {
      message: 'Message',
      messages: 'Messages',
      nomessage: 'Pas de message',
    },
    event: {
      _id: 'id',
      typol: 'Typologie',
      short_tit: 'Titre abrégé\'',
      title: 'Titre',
      details: 'Détails',
      bodytext: 'texte de l\'événement',
      dateTimeStart: 'Data Initiale',
      dateTimeEnd: 'Date de fin',
      bgcolor: 'Couleur de fond',
      days: 'Journées',
      icon: 'Icône',
      img: 'Image du nom de fichier',
      img_small: 'Image petite',
      where: 'Où',
      contribtype: 'Type de contribution',
      price: 'Prix',
      askinfo: 'Demander des infos',
      showpage: 'Voir la page',
      infoafterprice: 'Notes après le prix',
      teacher: 'Enseignant', // teacherid
      teacher2: 'Enseignant2', // teacherid2
      infoextra: 'Extra Info',
      linkpage: 'Site Web',
      linkpdf: 'Lien vers un PDF',
      nobookable: 'non réservable',
      news: 'Nouvelles',
      dupId: 'Id Double',
      canceled: 'Annulé',
      deleted: 'Supprimé',
      duplicate: 'Duplique',
      notempty: 'Le champ ne peut pas être vide',
      modified: 'modifié',
      showinhome: 'Montrer à la Home',
      showinnewsletter: 'Afficher dans la Newsletter',
      color: 'Couleur du titre',
    },
    disc: {
      typol_code: 'Type de code',
      order: 'Ordre',
    },
    newsletter: {
      title: 'Souhaitez-vous recevoir notre newsletter?',
      name: 'Ton nom',
      surname: 'Tu prénom',
      namehint: 'Nom',
      surnamehint: 'Prénom',
      email: 'votre e-mail',
      submit: 'S\'abonner',
      reset: 'Redémarrer',
      typesomething: 'Remplir le champ',
      acceptlicense: 'J\'accepte la licence et les termes',
      license: 'Vous devez d\'abord accepter la licence et les termes',
      submitted: 'Abonné',
      menu: 'Newsletter1',
      template: 'Modeles Email',
      sendemail: 'Envoyer',
      check: 'Chèque',
      sent: 'Dèjà envoyé',
      mailinglist: 'Leste de contacts',
      settings: 'Paramèters',
      serversettings: 'Serveur',
      others: 'Autres',
      templemail: 'Model Email',
      datetoSent: 'Date et heure d\'envoi',
      activate: 'Activé',
      numemail_tot: 'Total Email',
      numemail_sent: 'Emails envoyés',
      datestartJob: 'Inizio Invio',
      datefinishJob: 'Fin envoi',
      lastemailsent_Job: 'Dernier envoyé',
      starting_job: 'Envoyé',
      finish_job: 'Envoy Terminé',
      processing_job: 'travaux en cours',
      error_job: 'info d\'erreur',
      statesub: 'Abonné',
      wrongerr: 'Email inválido',
    },
    privacy_policy: 'Politique de confidentialité',
    cookies: 'Nous utilisons des cookies pour améliorer les performances Web.',
  },
};

export default msg_fr;
