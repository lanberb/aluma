/**
 * NOTICE:
 */
interface Message<D> {
  message: string;
  data: D;
}

type Response = <P, R>(message: Message, props: P) => R;
export const response: Response = <P, R>(m, p) => {
  figma.ui.postMessage(m);
};

export const request = () => {};

const intersepter = (callback?: Function) => callback?.();
