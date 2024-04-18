import { ReactReader } from "react-reader";
import { useLocalStorage } from "react-use";

interface Props {
  fileUrl: string;
  objectKey: string;
}

export const EpubReader = ({ fileUrl, objectKey }: Props) => {
  const [location, setLocation] = useLocalStorage<string | number>(
    `epub-location-${objectKey}`,
    1
  );

  return (
    <div className="h-full w-full">
      <ReactReader
        url={fileUrl}
        location={location ?? null}
        locationChanged={(location) => setLocation(location)}
      />
    </div>
  );
};
