import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { GuestLoginDto } from "./dto/guest-login.dto";
import { User } from "../users/user.entity";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async guestLogin(dto: GuestLoginDto) {
    const generatedName = `Guest-${Math.floor(Math.random() * 9000 + 1000)}`;
    const user = this.usersRepository.create({
      displayName: dto.displayName?.trim() || generatedName,
      isGuest: true
    });

    const savedUser = await this.usersRepository.save(user);

    const payload: JwtPayload = { sub: savedUser.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: savedUser.id,
        displayName: savedUser.displayName,
        isGuest: savedUser.isGuest
      }
    };
  }
}
