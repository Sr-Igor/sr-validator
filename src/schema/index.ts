import { f } from "./_internal/validations";
import conditions from "./_internal/conditions";
import { e } from "./_internal/handlers/messages";
import { preFire } from "./_internal/fines/prefine";
import { handleError } from "./_internal/handlers/error";
import { refinesServer } from "./_internal/fines/refines";

const schema = {
  f,
  preFire,
  handleError,
  conditions,
  refinesServer,
  e,
};

export default schema;
