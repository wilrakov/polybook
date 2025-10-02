export function BookCard({ cover, title, description }) {
  return (
    <div className="flex gap-2 hover:ml-2 h-[300px]">
      <div className="flex group w-[200px] overflow-hidden transition-all duration-300 hover:w-[500px]">
        <img src={cover} className="w-[200px] h-[300px] object-cover flex-shrink-0 rounded-[8px] group-hover:rounded-br-[0px] group-hover:rounded-tr-[0px]" />
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 pt-11 bg-amber-800 rounded-br-2xl rounded-tr-2xl">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
