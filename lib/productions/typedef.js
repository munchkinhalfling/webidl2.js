import { Base } from "./base";
import { type_with_extended_attributes, unescape } from "./helpers";

export class Typedef extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const tokens = {};
    const ret = new Typedef({ source: tokeniser.source, tokens });
    tokens.base = tokeniser.consume("typedef");
    if (!tokens.base) {
      return;
    }
    ret.idlType = type_with_extended_attributes(tokeniser, "typedef-type") || tokeniser.error("Typedef lacks a type");
    tokens.name = tokeniser.consume("identifier") || tokeniser.error("Typedef lacks a name");
    tokeniser.current = ret;
    tokens.termination = tokeniser.consume(";") || tokeniser.error("Unterminated typedef, expected `;`");
    return ret;
  }

  get type() {
    return "typedef";
  }
  get name() {
    return unescape(this.tokens.name.value);
  }
}
