import NameGate from "./home/NameGate";
import Main from "./main/Main";
import { useGateOpen } from "./main/auth/gate";

export default function App() {
  const open = useGateOpen();

  return (
    <>
      {/* The portfolio is always rendered — the gate only covers it — so the
          content stays crawlable and printable. While gated it is inert so
          keyboard and screen-reader users can't wander behind the overlay. */}
      <div
        className="flex flex-1 flex-col"
        inert={open ? undefined : true}
        aria-hidden={open ? undefined : true}
      >
        <Main />
      </div>
      {!open && <NameGate />}
    </>
  );
}
