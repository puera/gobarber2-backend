import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to update profile in user non-existent', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Renann Souza Tavares',
        email: 'rsouza@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renann Souza',
      email: 'teste@teste.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Renann Souza Tavares',
      email: 'rsouza@teste.com',
    });

    expect(updatedUser.name).toBe('Renann Souza Tavares');
    expect(updatedUser.email).toBe('rsouza@teste.com');
  });

  it('should not be able  to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Renann Souza',
      email: 'teste@teste.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renann Souza Tavares',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renann Souza',
      email: 'teste@teste.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Renann Souza Tavares',
      email: 'rsouza@teste.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renann Souza',
      email: 'teste@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renann Souza Tavares',
        email: 'rsouza@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renann Souza',
      email: 'teste@teste.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renann Souza Tavares',
        email: 'rsouza@teste.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
