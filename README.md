# Its a prototype for a camboard where user have a choice to use a normal whiteboard as well as a cam enabled one where they can write, erase and completely clear the board with hand gestures.

# Note:
    - Handpose tensorflow model is used for hand detection and getting its co-oridinates. The size and complexity is too big so it affects the performance of the app
    - The slow prediction makes the switching of eraser and brush slow, So user have to wait for few seconds
    - After starting the cam mode user will need to wait approx 10 seconds to start writing due to the model performance
    - The strokes are normal and smooth in whiteboard but once cam is on and u are doing it with hand gestures the strokes are not even due to slowness of the model.
    - Remember: 
        - Make a fist to clear the whole screen


# work left:
    - if(!flag) issue
    - clean the code
    - optimize it wherever possible
    - make 3 files one for control one for normal whiteboard functions and one for camboard