import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.Iterator;

import org.puredata.android.io.AudioParameters;
import org.puredata.android.service.PdService;

public class Pd extends CordovaPlugin {

    private final PdListener myListener = new PdListener() {

	    /* Recieve  bang from Pd */
	    @Override public void receiveBang(String source) {
		Log.i("receiveBang", "bang!");
	    }
		
	    @Override
	    public void receiveMessage(String source, String symbol, Object... args) {
		Log.i("receiveMessage symbol:", symbol);
		for (Object arg: args) {
		    Log.i("receiveMessage atom:", arg.toString());
		}
	    }
	    /* Receive a list from Pd */

	    @Override
	    public void receiveList(String source, Object... args) {
		for (Object arg: args) {
		    Log.i("receiveList atom:", arg.toString());
		}
	    }

	    /* Receive  symbol from Pd */
	    @Override public void receiveSymbol(String source, String symbol) {
		Log.i("receiveSymbol", symbol);
	    }

	    /* Receive  symbol from Pd */
	    @Override public void receiveFloat(String source, Float f) {
		Log.i("receiveFloat", f);
	    }

	    /* Receive  symbol from Pd */
	    @Override public void receiveInt(String source, Integer i) {
		Log.i("receiveInt", i);
	    }

	};
    /*
     * How to build pd
     * https://stackoverflow.com/questions/34803288/how-to-recieve-data-from-libpd-pd-for-android
     */
    private void initPD() throws IOException{
	int sampleRate = AudioParameters.suggestSampleRate();
	PdAudio.initAudio(sampleRate,0,2,8,true);

	dispatcher = new PdUiDispatcher();
	PdBase.setReceiver(dispatcher);

	
	dispatcher.addListener("pd_listener", myListener);
    }

    

    private void loadPD_Patch(String filename) throws IOException{
	File pdPatch =  new File(dir, filename);
	PdBase.openPatch(pdPatch.getAbsoluteFile());
    }

    @Override public boolean execute(String action,
				     JSONArray args,
				     CallbackContext callbackContext) throws JSONException {
	try {
	    switch(action){
	    case action == "init": initPD(); break;
	    case action == "open": loadPD_Patch(args["patch_name"]); break;
		//TODO
	    case action == "subscribe":  break;
	    case action == "processAudio": break;
	    case action == "sendBang": break;
	    case action == "sendSymbol": break;
	    case action == "receiveBang":  break;
	    case action == "receiveSymbol": break;
	    case action == "sendNumber": break;
	    case action == "receiveNumber": break;
	    case action == "sendList": break;
	    case action == "receiveList": break;
	    }
	    
	    return true;
	} catch (IOException e) {
	    Log.e(TAG, e.toString());
	    finish();
	    return false;
	}
    }
}
