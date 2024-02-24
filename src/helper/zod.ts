// import { z } from "zod";

// const FormRuleSchema = z.object({
//   required: z.boolean().optional(),
//   minLength: z.number().optional(),
//   maxLength: z.number().optional(),
//   valueAsNumber: z.boolean().optional(),
// });

// export const TextFieldFormSchema = z.object({
//   type: z.union([z.literal("long"), z.literal("short")]),
//   output: z.literal("string"),
//   formType: z.literal("textField"),
//   heading: z.string(),
//   placeholder: z.string().optional(),
//   formId: z.string(),
//   rules: FormRuleSchema,
// });

// export const MultiFormSchema = z.object({
//   type: z.literal("multi"),
//   output: z.literal("stringArray"),
//   formType: z.literal("textMulti"),
//   heading: z.string(),
//   selected: z.record(z.boolean()),
//   options: z.array(z.string()),
//   formId: z.string(),
//   rules: FormRuleSchema,
// });

// export const TextPlainFormSchema = z.object({
//   type: z.literal("title"),
//   output: z.literal("string"),
//   formType: z.literal("textPlain"),
//   title: z.string(),
//   subtitle: z.string(),
//   formId: z.string(),
//   rules: FormRuleSchema,
// });

// export const FormSchema = z.discriminatedUnion("formType", [
//   MultiFormSchema,
//   TextPlainFormSchema,
//   TextFieldFormSchema,
// ]);

// export type TFormData = z.infer<typeof FormSchema>;
