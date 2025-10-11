const client = load('@/database');

class MigrationsManager {
  #migrationsTableTitle = 'MIGRATIONS';
  
  async #checkTableExistance() {
    const query = `
      SELECT EXISTS (
         SELECT FROM 
          information_schema.tables 
         WHERE 
          table_name = ${this.#migrationsTableTitle}
      )
    `;

    const res = await client.query(query);
    console.log('res', res);
    return res;
  }

  async init() {
    this.#createTable();

    this.runMigrations();
  }

  #createTable() {
    const query = `
      CREATE TABLE [IF NOT EXISTS] ${this.#migrationsTableTitle}(
       ID BIGINT UNSIGNED NOT NULL PRIMARY KEY
       TITLE TEXT STRING NOT NULL
     )    
    `;
    return client.query(query);
  }

  async runMigrations() {
    const files = fs.readDirSync(resolve('@/migrations')); 
    const responses = await Promise.all(files.map(fl => this.#isMigrationInstalled(fl)));
    const uninstalledMigrations = responses.filter(r => !r);
    for (let i = 0; i < uninstalledMigrations.length; i++) {
      await this.#installMigration(uninstalledMigrations[i]);
    }
  }

  revertMigrations() {

  }

  #isMigrationInstalled(migrationTitle) {
    const query = `
      SELECT EXISTS(
        SELECT 
          ID
        FROM
          ${this.#migrationsTableTitle}
        WHERE
          TITLE = ${migrationTitle}
      )
    `;
  }

  #installMigration(file) {
    const query = fs.readFileSync(file);
    return client.query(query);
  }
}
