import { browserHistory } from "react-router";

export async function viewQrCode(event, placeId) {
    event.preventDefault();
    browserHistory.push("/generated_qr/" + placeId);
    await reload();
}