import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { Storage } from '@ionic/storage-angular'; // Usar Storage en lugar de SQLite
import { Router } from '@angular/router';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStorage: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStorage = jasmine.createSpyObj('Storage', ['create', 'get', 'set']); // Métodos que usaremos de Storage

    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: Router, useValue: mockRouter },
        { provide: Storage, useValue: mockStorage }
      ]
    });

    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize storage', async () => {
    mockStorage.create.and.returnValue(Promise.resolve()); // Simular la creación del almacenamiento
    await service.init();
    expect(mockStorage.create).toHaveBeenCalled();
  });

  it('should add a user', async () => {
    const usuario = {
      nombre: 'Juan',
      apellido: 'Pérez',
      rut: '12345678-9',
      telefono: '123456789',
      email: 'juan@example.com',
      password: 'password123'
    };

    // Simular la recuperación de usuarios previos y luego agregar el nuevo usuario
    mockStorage.get.and.returnValue(Promise.resolve([])); // No hay usuarios al principio
    mockStorage.set.and.returnValue(Promise.resolve()); // Simular la escritura en Storage

    await service.addUser(usuario);

    // Verificar que el nuevo usuario se haya añadido al almacenamiento
    expect(mockStorage.set).toHaveBeenCalledWith('usuarios', [usuario]);
  });

  it('should validate user credentials', async () => {
    const email = 'juan@example.com';
    const password = 'password123';
    const mockUsers = [
      { nombre: 'Juan', apellido: 'Pérez', email, password }
    ];

    // Simular que los usuarios están guardados en Storage
    mockStorage.get.and.returnValue(Promise.resolve(mockUsers));

    const usuario = await service.validateUser(email, password);

    expect(usuario).toBeTruthy();
    expect(usuario.nombre).toBe('Juan');
    expect(usuario.apellido).toBe('Pérez');
  });

  it('should return null if user not found during validation', async () => {
    const email = 'noexistent@example.com';
    const password = 'wrongpassword';
    const mockUsers = [
      { nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', password: 'password123' }
    ];

    // Simular que los usuarios están guardados en Storage
    mockStorage.get.and.returnValue(Promise.resolve(mockUsers));

    const usuario = await service.validateUser(email, password);

    expect(usuario).toBeNull();
  });

  it('should activate route if users exist', async () => {
    const mockUsers = [
      { nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', password: 'password123' }
    ];

    // Simular que hay usuarios en el almacenamiento
    mockStorage.get.and.returnValue(Promise.resolve(mockUsers));

    const result = await service.canActivate();
    expect(result).toBeTrue();
  });

  it('should navigate to login if no users exist', async () => {
    // Simular que no hay usuarios en el almacenamiento
    mockStorage.get.and.returnValue(Promise.resolve([]));

    const result = await service.canActivate();
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
