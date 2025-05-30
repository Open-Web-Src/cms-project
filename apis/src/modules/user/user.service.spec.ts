import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@entities';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Partial<Repository<User>>>;

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockResolvedValue({ id: 1, name: 'John' }),
      find: jest.fn().mockResolvedValue([{ id: 1, name: 'John' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    const result = await service.create({ name: 'John' } as any);
    expect(repo.create).toHaveBeenCalledWith({ name: 'John' });
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, name: 'John' });
  });
});
