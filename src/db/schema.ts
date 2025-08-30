import { mysqlTable, int, text, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const schools = mysqlTable('schools', {
  id: int('id').primaryKey().autoincrement(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  contact: varchar('contact', { length: 15 }).notNull(),
  image: text('image'),
  email_id: varchar('email_id', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export type School = typeof schools.$inferSelect;
export type NewSchool = typeof schools.$inferInsert;