import FloatButton from "@/components/FloatButton";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClubGallery({ isMember }: { isMember: boolean }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-2 w-full p-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <li key={i} className="bg-pink-500 aspect-video"></li>
        ))}
      </ul>
      <div className="absolute bottom-8 right-8">
        {isMember && (
          <FloatButton to="upload">
            <FontAwesomeIcon icon={faCamera} />
          </FloatButton>
        )}
      </div>
    </>
  );
}
