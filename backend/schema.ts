import { createSchema, list } from "@keystone-next/keystone/schema";
import { text, relationship, timestamp, password } from "@keystone-next/fields";
import { document } from "@keystone-next/fields-document";

export const lists = createSchema({
  User: list({
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
    },
  }),
  Company: list({
    fields: {
      name: text({ isRequired: true }),
      year: timestamp({ isRequired: true }),
      phone: relationship({ ref: "Phone.company", many: true }),
    },
  }),
  Phone: list({
    fields: {
      name: text({ isRequired: true }),
      company: relationship({ ref: "Company.phone", many: false }),
      document: document({
        formatting: {
          alignment: {
            center: true,
            end: true,
          },
          blockTypes: {
            blockquote: true,
          },
          inlineMarks: {
            bold: true,
            italic: true,
            underline: true,
          },
          headingLevels: [1, 2, 3],
          listTypes: {
            ordered: true,
            unordered: true,
          },
        },
        links: true,
        layouts: [],
        dividers: true,
      }),
    },
  }),
});
