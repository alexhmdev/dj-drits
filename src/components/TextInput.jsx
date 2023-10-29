function TextInput({ onChange }) {
  return (
    <textarea
      name="description"
      placeholder="Type a short description e.g: A lofi song for studying"
      className="bg-synthwave-base w-full rounded-lg border-2 border-secondary p-4 text-white shadow-lg placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-2 focus:ring-tertiary"
      onChange={onChange}
    ></textarea>
  );
}

export default TextInput;
