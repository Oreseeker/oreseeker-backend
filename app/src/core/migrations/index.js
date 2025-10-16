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
    const uninstalledMigrations = await Promise.all(files.filter(fl => this.#isMigrationInstalled(fl.split('.')[0])));
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
    return response.rows[0].exists;
  }

  async #installMigration(file) {
    const query = fs.readFileSync(resolve(`@/migrations/${file}`), 'utf8');
    const res = await client.query(query);
    console.log('res?', res);
    this.#updateInstallationStatus(file.split('.')[0]);
  }

  async #updateInstallationStatus(migrationTitle) {
    const query = `
      INSERT INTO
        ${this.#migrationsTableTitle} (
        TITLE
      ) VALUES (
        $1
      )
    `;
    
    await client.query(query, [migrationTitle]);
  }
}

const migrationsManager = new MigrationsManager();
migrationsManager.init();
