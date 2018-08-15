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
Scenario('US-1_2: DADO que eu estou na tela inicial, QUANDO eu alterar o título, conteúdo e tags de uma nota, ENTÂO o sistema deve mostrar a nota na lista com os novos dados', (I) => {

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

    pause();
});
