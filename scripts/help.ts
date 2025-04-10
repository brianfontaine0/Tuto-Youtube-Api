console.log(`
  🆘 Commandes disponibles
  
  🚀 pnpm dev
    ➤ Lance le serveur de développement (src/index.ts) avec watch via TSX.
  
  🔁 pnpm migrate
    ➤ Exécute le script de migration (migration/migration.ts).
  
  🛠️ pnpm generate:types
    ➤ Génère automatiquement des interfaces TypeScript à partir des fichiers JSON du dossier /data.
  
  📘 pnpm help:project
    ➤ Affiche cette aide.
  
  📦 Note :
    Toutes les commandes ne sont pas exécutables avec le mode watch.
  `);

process.exit(0);
