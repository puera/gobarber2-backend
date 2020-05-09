import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renann Souza',
      email: 'teste@teste.com',
      password: '123456',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.name).toBe('Renann Souza');
    expect(profile.email).toBe('teste@teste.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute('non-existing-user'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
