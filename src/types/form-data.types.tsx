// Shape of the data for the forms in the weather page
interface DataProps {
  inputDraft: { [key: string]: string };
  isEmpty: boolean;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (field: 'place' | 'date', e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (field: 'place' | 'date', e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

export { type DataProps };
