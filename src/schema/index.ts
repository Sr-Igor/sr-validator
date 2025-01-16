import { f } from "./_internal/validations";
// import conditions from "./_internal/conditions";
import { e } from "./_internal/handlers/messages";
import { preFire } from "./_internal/fines/prefine";
import { handleError } from "./_internal/handlers/error";
// import { refinesBodyServer } from "./_internal/fines/refines";

const schema = {
  f,
  preFire,
  handleError,
  // conditions,
  // refinesBodyServer,
  e,
};

export default schema;
