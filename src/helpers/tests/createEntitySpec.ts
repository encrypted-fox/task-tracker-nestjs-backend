// entity-test-utils.ts
import { getMetadataArgsStorage } from 'typeorm';

type EntityTestConfig<T> = {
  entity: new () => T;
  entityName: string;
  columns: string[];
  relations: {
    name: string;
    relationType: string;
  }[];
};

export function createEntityTests<T>(config: EntityTestConfig<T>) {
  const storage = getMetadataArgsStorage();

  describe('Database Structure', () => {
    it('should have correct table name', () => {
      const table = storage.tables.find((t) => t.target === config.entity);
      expect(table?.name).toBe(config.entityName);
    });

    config.columns.forEach((expected) => {
      it(`should have ${expected} column`, () => {
        const column = storage.columns.find(
          (c) => c.target === config.entity && c.propertyName === expected,
        );
        expect(column).toBeDefined();

        if (expected === 'id') {
          expect(column.options.primary).toBeTruthy();
        }
      });
    });

    config.relations.forEach((expected) => {
      it(`should have ${expected.name} relation`, () => {
        const relation = storage.relations.find(
          (c) => c.target === config.entity && c.propertyName === expected.name,
        );
        expect(relation).toBeDefined();
        expect(relation.relationType).toBe(expected.relationType);
      });
    });
  });
}
