import { Component, OnInit } from '@angular/core';
import { UpdatesService } from './services/updates.service';
import { Updates } from './models/updates';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  filter!: string;
  updates = {} as Updates;
  updatess: Updates[];

  constructor(private updatesService: UpdatesService) {
    this.updatess = [];
  }
  
  ngOnInit() {
    this.getUpdatess;
  }

  // defini se um updatess será criado ou atualizado
  saveUpdates(form: NgForm) {
    if (this.updates.id !== undefined) {
      this.updatesService.updateUpdates(this.updates).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.updatesService.saveUpdates(this.updates).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os updates
  listaUpdates(updates: Updates) {
    this.updatesService.listaUpdates(updates).subscribe(() => {
      this.updatess = [];
      this.updatess[0] = updates;
    });
  }

  // Chama o serviço para obtém todos os updates
  getUpdatess() {
    this.updatesService.getUpdates().subscribe((updatess: Updates[]) => {
      this.updatess = updatess;
    });
  }

  // deleta um updates
  deleteUpdates(updates: Updates) {
    this.updatesService.deleteUpdates(updates).subscribe(() => {
      this.getUpdatess();
    });
  }

  // copia o updates para ser editado.
  editUpdates(updates: Updates) {
    this.updates = { ...updates };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getUpdatess();
    form.resetForm();
    this.updates = {} as Updates;
  }
}
