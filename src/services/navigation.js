import { useHistory  } from "react-router-dom";

export async function ViewQrCode(event, placeId) {
    event.preventDefault();
    useHistory().push("/generated_qr/" + placeId);
}