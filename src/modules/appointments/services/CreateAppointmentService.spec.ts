import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      user_id: '123',
      provider_id: '2515151',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('2515151');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '123',
      provider_id: '2515151',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '2515151',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
