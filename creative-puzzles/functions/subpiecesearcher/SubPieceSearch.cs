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


namespace JPSpace.Function
{
    public static class SubPieceSearch
    {
        [FunctionName("SubPieceSearch")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];

            LoadImage(); 

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(responseMessage);
        }

        private static void LoadImage()
        {           
            string bigImagefilePath = "";
            Mat bigImageinputImage = new Mat(bigImagefilePath, ImreadModes.AnyDepth | ImreadModes.Grayscale);

            string smallImagefilePath = "";
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
            Trace.WriteLine("pointMin:" + pointMin);
            Trace.WriteLine("pointMax:" + pointMax);

            Rectangle r = new Rectangle(pointMax, subimage_edges.Size);
            CvInvoke.Rectangle(primary_edges,r, new MCvScalar(255,0,0),3);
            Image<Bgr, byte> img = primary_edges.ToImage<Bgr, byte>();
            img.Save("myfile.jpg");
        
        }
    }

}
