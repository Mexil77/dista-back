import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class PasswordsNotMatch implements ValidatorConstraintInterface {
  async validate(model: string, args: ValidationArguments): Promise<any> {
    return args.object['password'] === args.object[args.property];
  }
}
