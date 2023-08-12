using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using System.Diagnostics;
using System.Drawing;
using System.Text;

namespace JPSpace.Function
{
    public static class SubPieceSearch
    {
        [FunctionName("SubPieceSearch")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

                

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
          
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string name = data.name;     
            string puzzleImagePath = SaveImageFromRequest(name, data, "puzzleImage");
            string pieceImagePath = SaveImageFromRequest(name, data, "pieceImage");
          
            string resultFile = SearchImage(puzzleImagePath, pieceImagePath); 
            string encodedBase64 = String.Empty;

            using (Image imageToSend = Image.FromFile(resultFile))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    imageToSend.Save(m, imageToSend.RawFormat);
                    byte[] imageBytes = m.ToArray();

                    // Convert byte[] to Base64 String
                    encodedBase64 = Convert.ToBase64String(imageBytes);
                    
                }
            }      

            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(encodedBase64);
        }

        private static string SaveImageFromRequest(string fileName, dynamic data, string imageType){
            string imageFromMessage = String.Empty;
            if (imageType == "puzzleImage"){
                imageFromMessage = data.puzzleImage;
            } else if (imageType == "pieceImage"){
                imageFromMessage = data.pieceImage;
            }
         
            string imagePath = Path.Combine(Directory.GetCurrentDirectory(),fileName+Guid.NewGuid()+".jpg");          
            byte[] bytes = Convert.FromBase64String(FixBase64ForImage(imageFromMessage));
           
            using (MemoryStream ms = new MemoryStream(bytes))  
            {  
               Image imageToSave = System.Drawing.Image.FromStream(ms);  
               imageToSave.Save(imagePath);
            } 

            return imagePath;          
        }

        private static string SearchImage(string bigImagefilePath, string smallImagefilePath)
        {         
		    
            Mat bigImageinputImage = new Mat(bigImagefilePath, ImreadModes.AnyDepth | ImreadModes.Grayscale);    
            Mat smallImageinputImage = new Mat(smallImagefilePath, ImreadModes.AnyDepth | ImreadModes.Grayscale);

            Mat primary = CvInvoke.Imread(bigImagefilePath, ImreadModes.Color);
            Mat subimage = CvInvoke.Imread(smallImagefilePath, ImreadModes.Color);

            Mat primary_edges = new Mat();
            Mat subimage_edges = new Mat();     
            Mat result = new Mat();
            CvInvoke.Canny(primary,primary_edges, 32, 128, 3);
            CvInvoke.Canny(subimage,subimage_edges, 32,128, 3);

            CvInvoke.MatchTemplate(primary_edges, subimage_edges, result, TemplateMatchingType.CcoeffNormed);
            double min = 0.0;
            double max = 0.0;
            Point pointMin = new Point();
            Point pointMax = new Point();

            CvInvoke.MinMaxLoc(result, ref min, ref max, ref pointMin, ref pointMax);
            Trace.WriteLine("max:" + max);
            Trace.WriteLine("pointMax:" + pointMax);

            Rectangle r = new Rectangle(pointMax, subimage_edges.Size);
            CvInvoke.Rectangle(primary,r, new MCvScalar(242,5,29),10);
            Image<Bgr, byte> img = primary.ToImage<Bgr, byte>();
            string resultFile = "result"+Guid.NewGuid()+".jpg";
            img.Save(resultFile);

            return resultFile;
        }

        private static string FixBase64ForImage(string imageEncoded) { 

            imageEncoded = imageEncoded.Substring(imageEncoded.LastIndexOf(',') + 1);        

            StringBuilder sbText = new StringBuilder(imageEncoded, imageEncoded.Length);
            sbText.Replace("\r\n", String.Empty); 
            sbText.Replace(" ", String.Empty); 
            sbText.Replace('-', '+');
            sbText.Replace('_', '/');  

            return sbText.ToString(); 
        }
    }

}
