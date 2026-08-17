import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CurrentUser } from "./jwt-payload.interface";

export const GetCurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): CurrentUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
);
