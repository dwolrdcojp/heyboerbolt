import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TagsInput = ({ control, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addTag = (e) => {
    if (e.key === "Enter") {
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        e.preventDefault();
        append({ label: newTag }); // Append the new tag to the field array
        e.target.value = ""; // Clear the input
      }
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
