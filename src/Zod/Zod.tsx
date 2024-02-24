import { z } from "zod";

const FormRuleSchema = z.object({
  rules: z.array(
    z.object({
      required: z.boolean().optional(),
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      valueAsNumber: z.boolean().optional(),
    })
  ),
});

const FormIdSchema = z.object({
  formId: z.string(),
});

const TextFieldFormSchema = z.object({
  type: z.union([z.literal("long"), z.literal("short")]),
  output: z.literal("string"),
  formType: z.literal("textField"),
  heading: z.string(),
  placeholder: z.string().optional(),
});

const MultiFormSchema = z.object({
  type: z.literal("multi"),
  output: z.literal("stringArray"),
  formType: z.literal("textMulti"),
  heading: z.string(),
  selected: z.record(z.boolean()),
  options: z.array(z.string()),
});

const TextPlainFormSchema = z.object({
  type: z.literal("title"),
  output: z.literal("string"),
  formType: z.literal("textPlain"),
  title: z.string(),
  subtitle: z.string(),
});

const FormSchema = z.array(
  z
    .discriminatedUnion("formType", [
      MultiFormSchema,
      TextPlainFormSchema,
      TextFieldFormSchema,
    ])
    .and(FormRuleSchema)
    .and(FormIdSchema)
);

type TFormData = z.infer<typeof FormSchema>;

export const formData: TFormData = [
  {
    type: "title",
    title: "Tell Us About Yourself",
    subtitle: "Please fill this section and tell us about your experience",
    formId: "ID_TITLE",
    output: "string",
    formType: "textPlain",
    rules: [],
  },
  {
    type: "long",
    heading: "Tell us your experiences!",
    placeholder: "I'm familiar with many technologies such as...",
    formId: "ID_LONG",
    output: "string",
    formType: "textField",
    rules: [],
  },
  {
    type: "short",
    heading: "What's your name",
    placeholder: "Joseph Yusmita",
    formId: "ID_SHORT",
    output: "string",
    formType: "textField",
    rules: [{ required: true }],
  },
  {
    type: "multi",
    heading: "Which of these traits best describe you?",
    options: ["A. Moody", "B. Expressive", "C. Calm and Collected"],
    formId: "ID_MULTI",
    selected: { 1: true, 3: true },
    output: "stringArray",
    formType: "textMulti",
    rules: [],
  },
];

console.log(FormSchema.safeParse(formData));

export default function Zod() {
  return <div>Zod</div>;
}
