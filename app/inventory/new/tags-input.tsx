import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TagsInput = ({ control, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { setValue } = useFormContext();

  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      append({ label: e.target.value.trim() }); // append the new tag to the field array
      setValue(name, [
        ...fields.map((field) => field.label),
        e.target.value.trim(),
      ]); // update the form value
      e.target.value = ""; // Clear the input
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center border rounded px-2">
          <span>{field.label}</span>
          <Button type="button" onClick={() => remove(index)} className="ml-2">
            &times;
          </Button>
        </div>
      ))}
      <Input
        type="text"
        onKeyDown={addTag}
        placeholder="Press enter to add tags"
        className="flex-1 p-2 outline-none"
      />
    </div>
  );
};
