const createSprite = selector => {
//function declaration != function expression
    const moveFrame = (from, to) => {
        //remove classe atual e passa para a próxima
        $el.removeClass(from)
            .addClass(to);
    };

    //limita o array.
    const hasNext = () => current + 1 <= last;

    //função para adicionar o próximo frame
    const nextFrame = () => {

        //se existir mais frame, move para o próximo
        if (hasNext()) moveFrame(frames[current], frames[++current]);
    };

    const reset = () => {
        //retira o frame atual e volta para o frame 1
        moveFrame(frames[current], frames[0]);
        current = 0;
    };

    const isFinished = () => !hasNext();
    //para saber se há um próximo, e retornar false
    const $el = $(selector);

    const frames = [
        //classes do sprite.js
        'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
        'frame6', 'frame7', 'frame8', 'frame9'
    ];

    let current = 0;
    const last = frames.length - 1;

    $el.addClass(frames[current]);

    return {
        nextFrame,
        reset,
        isFinished
    };
};

