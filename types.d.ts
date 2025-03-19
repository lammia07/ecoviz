// Types for communication between electron (os) and react (ui)

type SaveResult = string[];

type EventPayloadMapping = {
  save: SaveResult;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    save: () => Promise<SaveResult>;
  };
}
