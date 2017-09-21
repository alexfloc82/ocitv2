import { DesplegableModule } from './desplegable.module';

describe('DesplegableModule', () => {
  let desplegableModule: DesplegableModule;

  beforeEach(() => {
    desplegableModule = new DesplegableModule();
  });

  it('should create an instance', () => {
    expect(desplegableModule).toBeTruthy();
  });
});
