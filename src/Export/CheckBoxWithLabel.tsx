import { ExportOptionsEnum } from "./export.types";

type checkBoxProps = {
  Label: string;
  OnChange: Function;
  Property: boolean;
};

export function CheckBoxWithLabel(props: checkBoxProps) {
  return (
    <label class="label cursor-pointer justify-start m-2">
      <input
        type="checkbox"
        checked={props.Property}
        onChange={(e) => props.OnChange(e, ExportOptionsEnum.Nodes)}
        class="checkbox"
      />
      <span class="label-text  ml-2">{props.Label}</span>
    </label>
  );
}
