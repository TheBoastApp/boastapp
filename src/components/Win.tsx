import EditWin from "./EditWin";

function Win(props: any) {
  return (
    <div className="min-w-[350px] max-w-[350px] m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">
            {props.description ? props.description : "Never had a job"}
          </p>
        </div>
        <EditWin
          id={props.id}
          name={props.name}
          description={props.description}
          updateWin={props.updateWin}
        />
      </div>
    </div>
  );
}

export default Win;
