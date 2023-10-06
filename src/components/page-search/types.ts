export interface IProps {
  labelWidth?: string;
  searchConfig: {
    formItems: FormItem[];
  };
}

export interface FormItem {
  type: string;
  prop: string;
  label: string;
  placeholder?: string;
  initialValue?: string;
}
