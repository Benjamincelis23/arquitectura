import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';  // Importar Storage

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements CanActivate {
  private storageInitialized = false;

  constructor(private router: Router, private storage: Storage) {
    this.init();
  }

  // Inicializar Storage
  async init() {
    await this.storage.create(); // Crea el almacenamiento si no está creado
    this.storageInitialized = true;
  }

  // Añadir un nuevo usuario al Storage
  async addUser(usuario: any): Promise<void> {
    if (!this.storageInitialized) {
      await this.init(); // Asegurarse de que Storage esté inicializado
    }

    // Obtén todos los usuarios y añade uno nuevo
    const usuarios = await this.getAllUsers();
    usuarios.push(usuario);

    // Guarda la lista de usuarios en Storage
    await this.storage.set('usuarios', usuarios);
    console.log('Usuario añadido con éxito:', usuario);
  }

  // Obtener todos los usuarios registrados desde Storage
  async getAllUsers(): Promise<any[]> {
    if (!this.storageInitialized) {
      await this.init(); // Asegurarse de que Storage esté inicializado
    }

    // Recuperar los usuarios desde Storage
    const usuarios = await this.storage.get('usuarios');
    return usuarios || []; // Si no hay usuarios, devolver un array vacío
  }

  // Verificar si un usuario con el correo y contraseña ingresados existe en Storage
  async validateUser(email: string, password: string): Promise<any> {
    if (!this.storageInitialized) {
      await this.init(); // Asegurarse de que Storage esté inicializado
    }

    const usuarios = await this.getAllUsers();
    // Buscar el usuario que coincida con el email y la contraseña
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    return usuario || null; // Retorna el usuario encontrado o null si no existe
  }

  // Guard para proteger rutas si el usuario está autenticado
  async canActivate(): Promise<boolean> {
    const usuarioRegistrado = await this.getAllUsers(); // Obtener los usuarios registrados
    if (usuarioRegistrado.length > 0) {
      return true; // Permitir acceso si hay usuarios registrados
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no hay usuarios
      return false;
    }
  }
}
