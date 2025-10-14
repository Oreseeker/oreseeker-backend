const client = load('@/database');
const fs = require('fs');

class MigrationsManager {
  #migrationsTableTitle = 'MIGRATIONS';
  
 async init() {
    await this.#createTable();

    await this.runMigrations();
  }

  #createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.#migrationsTableTitle}(
       ID BIGINT NOT NULL PRIMARY KEY,
       TITLE TEXT NOT NULL
     )    
    `;
    return client.query(query);
  }

  async runMigrations() {
    const files = fs.readdirSync(resolve('@/migrations')); 
    console.log('files', files);
    const responses = await Promise.all(files.map(fl => this.#isMigrationInstalled(fl.split('.')[0])));
    console.log('responses', responses);
    const uninstalledMigrations = responses.filter(r => !r);
    console.log('uninstalledMigrations', uninstalledMigrations);
    for (let i = 0; i < uninstalledMigrations.length; i++) {
      await this.#installMigration(uninstalledMigrations[i]);
    }
  }

  revertMigrations() {

  }

  async #isMigrationInstalled(migrationTitle) {
    const query = `
      SELECT EXISTS(
        SELECT 
          ID
        FROM
          ${this.#migrationsTableTitle}
        WHERE
          TITLE = $1
      )
    `;
    const response = await client.query(query, [migrationTitle]);
    return !!response.rowCount;
  }

  #installMigration(file) {
    const query = fs.readFileSync(file);
    return client.query(query);
  }
}

const migrationsManager = new MigrationsManager();
migrationsManager.init();
