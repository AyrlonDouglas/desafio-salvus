import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

import { Repository } from 'typeorm';
import { Professional } from './entities/professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
    private sersService: UsersService,
  ) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    const professional = await this.professionalRepository.insert(
      createProfessionalDto,
    );
    const updateUser = await this.sersService.update(
      createProfessionalDto.user_id,
      {
        professional_id: professional.identifiers[0].id,
      },
    );

    return professional;
  }

  findAll() {
    return this.professionalRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const professional = await this.professionalRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!professional) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return professional;
  }

  update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalRepository.update(id, updateProfessionalDto);
  }

  remove(id: number) {
    return this.professionalRepository.delete(id);
  }
}
