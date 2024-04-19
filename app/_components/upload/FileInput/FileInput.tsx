interface Props {
  onInput: (file?: File) => void;
}

export const FileInput = ({ onInput }: Props) => {
  return (
    <div>
      <input type="file" onChange={(e) => onInput(e.target.files?.[0])} />
    </div>
  );
};
