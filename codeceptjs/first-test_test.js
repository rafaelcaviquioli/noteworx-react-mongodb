Feature('User-Story-1: Eu como usuário, preciso guardar notas em algum lugar, para que não esqueça de coisas que tenho a fazer.');

Before((I) => {
    I.amOnPage('/');
    I.wait(2);
    I.see('NoteWorx');
});

Scenario('US-1_1: DADO que eu estou na tela inicial, QUANDO eu cadastrar uma nota preenchendo o título, conteúdo e tags, ENTÂO o sistema deve mostrar a nota na lista', (I) => {

    I.say('DADO QUE');
    I.waitForElement('#add');

    I.say('QUANDO');
    I.click('#add');
    I.see('New Note');
    I.fillField('input[name=title]', 'Fazer feira');
    I.fillField('textarea[name=content]', 'maçã, abacate, banana, cenoura');
    I.fillField('input[name=tags]', 'feira, saude');
    I.click('#save');

    I.say('ENTÂO');
    I.waitForText('Fazer feira', 5);
    I.waitForText('maçã, abacate, banana, cenoura', 5);
});
Scenario('US-1_2: DADO que eu estou na tela inicial, QUANDO eu cadastrar uma nota sem preencher o título, ENTÂO o sistema deve mostrar que o título é obrigatório', (I) => {

    I.say('DADO QUE');
    I.waitForElement('#add');

    I.say('QUANDO');
    I.click('#add');
    I.see('New Note');

    I.fillField('input[name=title]', '');
    I.click('#save');

    I.say('ENTÂO');
    I.waitForText('Title is required', 5);
});
Scenario('US-1_3: DADO que eu estou na tela inicial, QUANDO eu alterar o título, conteúdo e tags de uma nota, ENTÂO o sistema deve mostrar a nota na lista com os novos dados', (I) => {

    I.say('DADO QUE');
    I.waitForElement('.edit-note:first-child');
    I.click('.edit-note:first-child');
    I.see('Edit Note');
    I.seeInField('input[name=title]', 'Fazer feira');
    I.seeInField('textarea[name=content]', 'maçã, abacate, banana, cenoura');
    I.seeInField('input[name=tags]', 'feira, saude');

    I.say('QUANDO');
    I.fillField('input[name=title]', 'Ir na feira');
    I.fillField('textarea[name=content]', 'batata, aipim');
    I.fillField('input[name=tags]', 'feira');
    I.click('#save');

    I.say('ENTÂO');
    I.waitForText('Ir na feira', 5);
    I.waitForText('batata, aipim', 5);
});
Scenario('US-1_4: DADO que eu estou na tela inicial, QUANDO eu buscar uma nota pelo seu título, ENTÂO o sistema deve mostrar a nota na lista', (I) => {

    I.say('DADO QUE');
    I.waitForElement('#input_search');
  
    I.say('QUANDO');
    I.fillField('#input_search', 'feira');
    I.click('#search');

    I.say('ENTÂO');
    I.waitForText('Ir na feira', 5);
    I.waitForText('batata, aipim', 5);

});
Scenario('US-1_5: DADO que eu estou na tela inicial, QUANDO eu buscar uma nota inexistente, ENTÂO nenhum resultado deve ser exibido na lista', (I) => {

    I.say('DADO QUE');
    I.waitForElement('#input_search');
  
    I.say('QUANDO');
    I.fillField('#input_search', 'abcdfghij');
    I.click('#search');

    I.say('ENTÂO');
    I.seeNumberOfElements('#table-notes td', 0);
});

Scenario('US-1_6: DADO que eu estou na tela inicial, QUANDO eu excluir uma nota, ENTÂO a nota não deve ser exibida na lista', (I) => {

    I.say('DADO QUE');
    I.waitForText('feira');

    I.say('QUANDO');
    I.click('.delete-note');
    I.acceptPopup();

    I.say('ENTÂO');
    I.dontSee('feira');
    I.seeNumberOfElements('#table-notes td', 0);
});
